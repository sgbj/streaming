import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Box, Flex, Heading, AspectRatio } from '@chakra-ui/react';
import ReactHlsPlayer from 'react-hls-player';
import { Chat } from './Chat';

export function Channel() {
  const { userName } = useParams();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    fetch(`/channels/${userName}`)
      .then(res => res.json())
      .then(
        result => {
          setChannel(result);
        },
        error => {
          console.log(error);
        }
      )
  }, [userName]);

  return (
    <Flex grow="1" w="100%">
      <Box w="100%" h="100%" pos="relative">
        <Box pos="absolute" w="100%" h="100%" p="4" overflow="auto">
          <AspectRatio ratio={16 / 9}>
            <ReactHlsPlayer src={`/hls/${channel?.streamId}.m3u8`} autoPlay={true} controls={true} muted={true} />
          </AspectRatio>
          <Box borderRadius="md" p="4" mt="4" className="surface">
            <Heading size="md" fontWeight="semibold" letterSpacing="wide" mb="2">{userName}</Heading>
          </Box>
        </Box>
      </Box>
      <Chat channelName={userName} />
    </Flex>
  );
}
