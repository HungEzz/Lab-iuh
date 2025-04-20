import React, { useState } from 'react'

function PrintName() {
  const [name, setName] = useState('')
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const updateName = () => {
    setName(inputValue)
  }

  const deleteName = () => {
    setName('')
    setInputValue('')
  }

  return (
    <div className="name-card">
      <h2>Name Greeter</h2>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Enter your name..." 
          onChange={handleChange}
          value={inputValue}
        />
        <div className="name-actions">
          <button 
            className="btn submit"
            onClick={updateName}
            disabled={!inputValue.trim()}
          >
            Submit
          </button>
          <button 
            className="btn clear"
            onClick={deleteName}
            disabled={!inputValue && !name}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="greeting">
        {name && <h3>Hello, {name}!</h3>}
      </div>
    </div>
  )
}

export default PrintName