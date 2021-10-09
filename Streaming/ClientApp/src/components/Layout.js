import { Link } from 'react-router-dom'
import { useColorMode, useColorModeValue, IconButton, Flex, Spacer, Heading } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { LoginMenu } from './api-authorization/LoginMenu';

export function Layout(props) {
  const { toggleColorMode } = useColorMode();
  const ColorModeIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <Flex h="100vh" direction="column">
      <Flex p="4" align="center" boxShadow="md" className="surface" zIndex="2">
        <Heading size="md" as={Link} to="/">👾 Streaming</Heading>
        <Spacer />
        <LoginMenu />
        <IconButton icon={<ColorModeIcon />} variant="ghost" onClick={toggleColorMode} ml="2" />
      </Flex>
      {props.children}
    </Flex>
  );
}
