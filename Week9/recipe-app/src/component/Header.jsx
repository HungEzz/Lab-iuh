import React from 'react'
import '../App.css'
import { NavLink} from 'react-router-dom'

function Header() {
  return (
    <header className="header">
        <div className="header-left">
        <div className="logo">
          <img src="/Group 9.png" alt="Chefify Logo" />
        </div>
      </div>

      <div className="header-middle">
        <div className="search-bar">
            <button className="search-icon">
                 <img src="/Search.png" alt="" />
            </button>
            <input type="text" placeholder="What would you like to cook?" />
          
        </div>
      </div>

      <div className="header-right">
        <nav className="navigation">
          <NavLink to = "/" className= {({isActive})=> `child ${ isActive ? 'active' : ''}`}>What to cook</NavLink>
          <NavLink to = "/recipes" className= {({isActive})=> `child ${ isActive ? 'active' : ''}`}>Recipes</NavLink>
          <NavLink to = "/ingredients" className= {({isActive})=> `child ${ isActive ? 'active' : ''}`}>Ingredients</NavLink>
          <NavLink to = "/occasions" className= {({isActive})=> `child ${ isActive ? 'active' : ''}`}>Occasions</NavLink>
          <NavLink to = "/about-us" className= {({isActive})=> `child ${ isActive ? 'active' : ''}`}>About Us</NavLink>

        </nav>
        <div className="auth-buttons">
          <button className="login-button">Login</button>
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>
    </header>
  )
}

export default Header
