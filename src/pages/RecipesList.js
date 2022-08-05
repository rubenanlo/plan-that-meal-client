import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getAllProjects = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="RecipeListPage">
      {recipes?.map((recipe) => {
        return (
          <div className="ProjectCard card" key={recipe._id}>
            <Link to={`/recipes/${recipe._id}`}>
              <h3>{recipe.title}</h3>
              <img src={recipe.title} alt="recipe" />
              <p>{recipe.protein}</p>
              <p>{recipe.serving}</p>
              {recipe?.ingredients?.map((ingredient) => {
                return (
                  <>
                    <p>{ingredient.ingredient}</p>
                    <p>{ingredient.quantity}</p>
                  </>
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
