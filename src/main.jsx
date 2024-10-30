import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'; // Chakra UI import karein
import theme from '../src/Theme.jsx'; // Path to your theme file

// import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

<ChakraProvider theme={theme}> {/* ChakraProvider ko wrap karein */}

      <App />
    </ChakraProvider>
  </StrictMode>,
)
