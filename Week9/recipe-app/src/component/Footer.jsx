import React from 'react'

function Footer() {
  return (
    <footer className="footer">
         <div className="footer-content"> {/* Container for the main columns */}

<div className="footer-section footer-about">
  <h2>About Us</h2>
  <p>Welcome to our website, a wonderful place to explore and learn how to cook like a pro.</p>
  <form className="footer-subscribe-form">
    <input type="email" placeholder="Enter your email" />
    <button type="submit">Send</button>
  </form>
</div>

<div className="footer-section footer-links">
  <h2>Learn More</h2>
  <nav>
    <ul>
      <li><a href="#">Our Cooks</a></li>
      <li><a href="#">See Our Features</a></li>
      <li><a href="#">FAQ</a></li>
    </ul>
  </nav>
</div>

<div className="footer-section footer-links"> {/* Using the same class as it's a links list */}
  <h2>Shop</h2>
  <nav>
    <ul>
      <li><a href="#">Gift Subscription</a></li>
      <li><a href="#">Send Us Feedback</a></li>
    </ul>
  </nav>
</div>

<div className="footer-section footer-links"> {/* Using the same class */}
  <h2>Recipes</h2>
  <nav>
    <ul>
      <li><a href="#">What To Cook This Week</a></li>
      <li><a href="#">Pasta</a></li>
      <li><a href="#">Dinner</a></li>
      <li><a href="#">Healthy</a></li>
      <li><a href="#">Vegetarian</a></li>
      <li><a href="#">Vegan</a></li>
      <li><a href="#">Christmas</a></li>
    </ul>
  </nav>
</div>

</div>

<div className="footer-bottom"> {/* Bottom row for logo, copyright, and policy links */}
 <div className="footer-logo">
   {/* Placeholder for Logo - Use the same as header or a footer specific one */}
   <img src="/Group 9.png" alt="" />
 </div>
 <span className="footer-copyright">&copy; 2023 Chefify Company</span>
 <div className="footer-policy-links">
    <a href="#">Terms of Service</a>
    <a href="#">Privacy Policy</a>
 </div>
</div>
    </footer>
  )
}

export default Footer
