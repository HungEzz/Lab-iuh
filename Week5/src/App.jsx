import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chefify from './components/Chefify'
import {UseReducer,ReactMemo, UseMemo} from './components/userReducer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col'>
      <Chefify/>
    </div>
  )
}

export default App
