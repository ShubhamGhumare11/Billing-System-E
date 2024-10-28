import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Button, Text } from '@chakra-ui/react'; // Chakra UI components import karein
import HomePage from './Components/Homepage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HomePage/>

    </>
  )
}

export default App
