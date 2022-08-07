import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  return (
    <div className="RecipeListPage wrapper">
      {recipes?.map((recipe) => {
        return (
          <div className="RecipeCard card" key={recipe._id}>
            <Link to={`/recipes/${recipe._id}`}>
              <h3>{recipe.title}</h3>
              <img src={recipe.img} alt="recipe" />
              <p>{recipe.protein}</p>
              <p>{recipe.serving}</p>
              {recipe.ingredients.map((ingredient) => {
                return (
                  <div key={ingredient.id}>
                    <p>
                      {ingredient.quantity} {ingredient.ingredient}
                    </p>
                  </div>
                );
              })}
              <p>{recipe.description}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default RecipesList;
