import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chefify from './components/Chefify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Chefify/>
    </>
  )
}

export default App
