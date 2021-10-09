import { useState, useEffect, useRef } from 'react';
import { Box, Flex, Heading, Textarea, Text } from '@chakra-ui/react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import authService from './api-authorization/AuthorizeService';

export function Chat({ channelName }) {
  const chatBoxRef = useRef();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    async function updateAuth() {
      try {
        setIsAuthenticated(await authService.isAuthenticated());
      } catch (ex) {
        console.log(ex);
      }
    }
    updateAuth();
    const subscriptionId = authService.subscribe(updateAuth);
    return () => {
      authService.unsubscribe(subscriptionId);
    };
  }, []);

  useEffect(() => {
    async function connect() {
      try {
        if (isAuthenticated) {
          const connection = new HubConnectionBuilder()
            .withUrl('/chat', {
              accessTokenFactory: async () => await authService.getAccessToken()
            })
            .withAutomaticReconnect()
            .build();
  
          connection.on('ReceiveMessage', (userName, message) => {
            setMessages(messages => [...messages, { userName, message }]);
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
          });
  
          await connection.start();
          await connection.invoke('JoinChannel', channelName);
          setConnection(connection);
        }
      } catch (ex) {
        console.log(ex);
      }
    }
    connect();
    return () => {
      setConnection(connection => connection?.stop());
    };
  }, [isAuthenticated, channelName]);

  function onTextareaKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      connection?.send('SendMessage', channelName, e.target.value);
      e.target.value = '';
      e.preventDefault();
    }
  };

  return (
    <Flex h="100%" direction="column" w="25em" p="4" className="surface" zIndex="1">
      <Heading size="sm" mb="4" className="muted" fontWeight="semibold" letterSpacing="wide" textTransform="uppercase">Chat</Heading>
      <Flex grow="1" direction="column" pos="relative">
        <Box pos="absolute" w="100%" h="100%" overflow="auto" ref={chatBoxRef}>
          {messages.map((m, i) => (<Box key={i}><Text as="strong">{m.userName}</Text>: {m.message}</Box>))}
        </Box>
      </Flex>
      {isAuthenticated && <Textarea mt="4" resize="none" rows="2" placeholder="Send a message" variant="filled" onKeyDown={onTextareaKeyDown} />}
    </Flex>
  );
}
