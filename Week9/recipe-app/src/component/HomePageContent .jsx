import React from 'react'
import RecipeCard from './RecipeCard '
import Content from './Content '
function HomePageContent () {
  return (
    <div>
       <div className="top-section-background">
                <RecipeCard />
              </div>
              <Content/>
    </div>
  )
}

export default HomePageContent 
