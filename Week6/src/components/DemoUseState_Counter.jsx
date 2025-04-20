import React, { useState } from 'react'

function Counter() {
  const [counter, setCounter] = useState(0)
  
  const handleIncrease = () => {
    setCounter(prevCount => prevCount + 1)
  }

  const handleDecrease = () => {
    setCounter(prevCount => prevCount - 1)
  }

  const handleReset = () => {
    setCounter(0)
  }

  return (
    <div className="counter-card">
      <h2>Counter</h2>
      <div className="counter-display">{counter}</div>
      <div className="counter-actions">
        <button 
          className="btn decrease" 
          onClick={handleDecrease}
          disabled={counter <= 0}
        >
          -
        </button>
        <button 
          className="btn reset" 
          onClick={handleReset}
          disabled={counter === 0}
        >
          Reset
        </button>
        <button 
          className="btn increase" 
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Counter