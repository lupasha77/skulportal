
// frontend/src/theme.js
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      500: '#319795',
      600: '#2C7A7B',
      700: '#285E61',
    },
    
  },
  components: {
    Button: {
      variants: {
        cancel: {
          bg: 'red.400',
          color: 'black',
          _hover: {
            bg: '#F70D1A',
            color: 'white',
          },
          _active: {
            bg: '#F70D1A',
            color: 'black',
          },
        },
      },
    },
  }
})

export default theme