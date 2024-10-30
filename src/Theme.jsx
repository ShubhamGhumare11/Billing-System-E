import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      '@media screen and (min-width: 48em)': {
        '.css-1kj7nfu': {
          marginLeft: '0 !important', // Forcefully remove margin left
        },
      },
    },
  },
});

export default theme;
