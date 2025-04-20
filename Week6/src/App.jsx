import { useState } from 'react'
import './App.css'
import Counter from './components/DemoUseState_Counter'
import PrintName from './components/DemoUseState_PrintName'
import Hidden from './components/DemoUseState_Hidden'
import BuyItem from './components/DemoUseState_Buy'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>React State Demo</h1>
      </header>
      
      <main className="component-grid">
        <Counter />
        <PrintName />
        <Hidden />
        <BuyItem />
      </main>
      
      <footer>
        <p>React Hooks Practice - 2023</p>
      </footer>
    </div>
  )
}

export default App
