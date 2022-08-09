import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  return (
    <>
      {recipes.length === 0 && (
        <div>
          <p>
            Be the first to create a new recipe{" "}
            <Link to="/recipes/create">here</Link>
          </p>
          <img src="../../empty-recipe.jpeg" alt="" />
        </div>
      )}

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
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
    </>
  );
}

export default RecipesList;
