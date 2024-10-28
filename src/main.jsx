import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'; // Chakra UI import karein

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

<ChakraProvider> {/* ChakraProvider ko wrap karein */}
      <App />
    </ChakraProvider>
  </StrictMode>,
)
