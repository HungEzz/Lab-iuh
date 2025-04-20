import React, { useState } from 'react'

function BuyItem() {
  const [items, setItems] = useState([])
  const [input, setInput] = useState('')

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const addItem = () => {
    if (input.trim()) {
      setItems(prevItems => [...prevItems, input.trim()])
      setInput('')
    }
  }

  const removeItem = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }

  return (
    <div className="cart-card">
      <h2>Shopping Cart</h2>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="Enter product name..." 
          onChange={handleInputChange} 
          onKeyPress={handleKeyPress}
          value={input}
        />
        <button 
          className="btn add"
          onClick={addItem}
          disabled={!input.trim()}
        >
          Add to Cart
        </button>
      </div>
      
      <div className="cart-items">
        <h3>Your Cart:</h3>
        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <span>{item}</span>
                <button 
                  className="btn remove"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default BuyItem