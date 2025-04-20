import React from 'react'

function RecipeCard () {

    const recipeData = {
        label: 'Recipe of the day',
        title: 'Salad Caprese',
        description: 'Classic Italian Salad Caprese: ripe tomatoes, fresh mozzarella, herbs, olive oil, and balsamic vinegar create a refreshing dish for lunch or appetizer',
        author: {
          avatar: '/Avatar (4).png',
          name: 'Salad Caprese', // Assuming this is a recipe name repetition, might be author name in a real app
        },
        // viewLink: '#', // Link for the button
      };

  return (
    <div className="recipe-card-parent">
        <div className="recipe-card">
        <div className="recipe-label">{recipeData.label}</div> {/* Positioned label */}
        <div className="card-content">
          <h3 className="recipe-title">{recipeData.title}</h3>
          <p className="recipe-description">{recipeData.description}</p>

          <div className="recipe-author">
            <img className="author-avatar" src={recipeData.author.avatar} alt="" />
            <span className="author-name">{recipeData.author.name}</span>
          </div>

          <button className="view-button">View Now →</button>
        </div>
      </div>
     </div>
  )
}

export default RecipeCard 
