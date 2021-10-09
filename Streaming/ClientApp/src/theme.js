import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const overrides = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true
  },
  styles: {
    global: (props) => ({
      '::-webkit-scrollbar': {
        width: '.4em'
      },
      '::-webkit-scrollbar-track': {
        background: 'transparent'
      },
      '::-webkit-scrollbar-thumb': {
        borderRadius: '.4em',
        background: mode('gray.300', 'gray.700')(props)
      },
      '.surface': {
        background: mode('gray.200', 'gray.900')(props)
      },
      '.muted': {
        color: mode('gray.600', 'gray.500')(props)
      }
    })
  }
};

export default extendTheme(overrides);
