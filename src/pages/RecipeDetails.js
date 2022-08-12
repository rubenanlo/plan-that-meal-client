import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./RecipeDetails.css";
function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const { isLoading } = useContext(AuthContext);

  const { recipeId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecipe = response.data;
        setRecipe(oneRecipe);
      })
      .catch((error) => console.log(error));
  }, [recipeId, storedToken]);

  if (recipe === null) {
    return <>loading...</>;
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="RecipeDetails" key={recipeId}>
          {recipe && (
            <>
              <h2>{recipe.title}</h2>
              <img src={recipe.img} alt="dish" />
              <p>Main protein: {recipe.protein}</p>
              <p>Serving: {recipe.serving}</p>
              <p>Ingredients:</p>
              {recipe &&
                recipe?.ingredients.map((ingredient) => (
                  <li className="Ingredients" key={ingredient.id}>
                    {ingredient.quantity} gr {ingredient.ingredient}
                  </li>
                ))}

              <p style={{ maxWidth: "30%", marginLeft: "35vw" }}>
                How to make it: {recipe.description}
              </p>
            </>
          )}

          <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <Link to={`/recipes/edit/${recipe?._id}`}>
              <button>Edit</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeDetails;
