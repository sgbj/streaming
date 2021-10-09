import { useState, useEffect } from 'react';
import { Box, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import { ChannelCard } from './ChannelCard';

export function Home() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetch('/channels/live')
      .then(res => res.json())
      .then(
        result => {
          setChannels(result);
        },
        error => {
          console.log(error);
        }
      )
  }, []);

  return (
    <Box w="100%" h="100%" p="4">
      <Heading size="sm" mb="4" className="muted" fontWeight="semibold" letterSpacing="wide" textTransform="uppercase">Live channels</Heading>
      <Wrap spacing="4">
        {channels.map(c => <WrapItem key={c.streamId}><ChannelCard channel={c} /></WrapItem>)}
      </Wrap>
    </Box>
  );
}
