import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Typography } from '@mui/material'
import FilesManager from './FilesManager'
import fileStructure from './assets/fileStructure.json';

function App() {
  const [count, setCount] = useState(0)
  const data = fileStructure.files

  return (
    <Box>
      <FilesManager previousFolder="" item={data}/>
    </Box>
  )
}

export default App
