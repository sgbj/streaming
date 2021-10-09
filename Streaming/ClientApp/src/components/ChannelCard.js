
import { Link } from 'react-router-dom'
import { Box, Image, LinkBox, LinkOverlay } from '@chakra-ui/react';

export function ChannelCard({ channel }) {
  return (
    <LinkBox overflow="hidden" className="surface" shadow="sm" rounded="md" maxW="25em">
      <Image src={`/hls/${channel.streamId}.png`} fallbackSrc="https://via.placeholder.com/1920x1080/000/000.png" />
      <Box p="4">
        <Box>
        <LinkOverlay fontWeight="semibold" as={Link} to={`/${channel.userName}`}>
          {channel.userName}
        </LinkOverlay>
        </Box>
      </Box>
    </LinkBox>
  );
}
