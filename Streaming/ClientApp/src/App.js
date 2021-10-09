import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Channel } from './components/Channel';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';

import './custom.css'

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} useSystemColorMode={theme.config.initialColorMode} />
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        <Route path='/:userName' component={Channel} />
      </Layout>
    </ChakraProvider>
  );
}
