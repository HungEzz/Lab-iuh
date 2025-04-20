import './App.css'
import Header from './component/Header'
import RecipeCard from './component/RecipeCard '
import Footer from './component/Footer'
import {BrowserRouter} from 'react-router-dom'
import Rout from './component/Rout'
import HomePageContent from './component/HomePageContent '

function App() {

  return (
    <BrowserRouter>
       <>
   
          <div className="app-container">
              <Header />
              <Rout/>
              <Footer />
        </div>
</>
    </BrowserRouter>
   
  )
}

export default App
