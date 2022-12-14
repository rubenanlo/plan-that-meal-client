import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./RecipesList.css";

function RecipesList() {
  const { isLoading } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("protein") || "";
  const handleSearch = (e) => {
    const protein = e.target.value;
    return protein ? setSearchParams({ protein }) : setSearchParams({});
  };

  const renderRecipes = () => {
    let result;
    searchTerm !== ""
      ? (result =
          recipes.filter((recipe) => recipe.protein?.includes(searchTerm))
            .length === 0 ? (
            <div className="no-data">
              <p>
                Be the first to create a new recipe{" "}
                <Link to="/recipes/create">here</Link>
              </p>
              <img src="../../empty-recipe.jpeg" alt="" />
            </div>
          ) : (
            recipes
              .filter((recipe) => recipe.protein?.includes(searchTerm))
              .map((recipe) => {
                return (
                  <Link
                    className="link-no-format"
                    to={`/recipes/${recipe._id}`}
                    key={recipe._id}
                  >
                    <div
                      className="recipe"
                      key={recipe._id}
                      style={{ backgroundImage: `url(${recipe.img})` }}
                    >
                      <h3>{recipe.title}</h3>
                      <div className="recipe-details">
                        <p>Protein: {recipe.protein}</p>
                        <p>
                          Ingredients:{" "}
                          {recipe.ingredients?.slice(0, 2).map((ingredient) => (
                            <li key={ingredient.id}>
                              {ingredient.quantity} gr {ingredient.ingredient}
                            </li>
                          ))}
                          ...
                        </p>
                        <p>Description: {recipe.description.slice(0, 60)}...</p>
                      </div>
                    </div>
                  </Link>
                );
              })
          ))
      : (result = recipes?.map((recipe) => {
          return (
            <Link
              className="link-no-format"
              to={`/recipes/${recipe._id}`}
              key={recipe._id}
            >
              <div
                className="recipe"
                key={recipe._id}
                style={{ backgroundImage: `url(${recipe.img})` }}
              >
                <h3>{recipe.title}</h3>
                <div className="recipe-details">
                  <p>Protein: {recipe.protein}</p>
                  <p>
                    Ingredients:{" "}
                    {recipe.ingredients.slice(0, 2).map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.quantity} gr {ingredient.ingredient}
                      </li>
                    ))}
                    ...
                  </p>
                  <p>Description: {recipe.description.slice(0, 60)}...</p>
                </div>
              </div>
            </Link>
          );
        }));

    return result;
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="create-option">
            <p> Any chance you want to create your recipe?</p>
            <NavLink to="/recipes/create">Dive right in!</NavLink>
          </div>

          <div className="search">
            <form onChange={handleSearch}>
              <select
                type="text"
                name="protein"
                value={searchTerm}
                placeholder="search by protein"
                onChange={(e) => {
                  setSearchParams({ protein: e.target.value });
                }}
              >
                <option value={""}>Search by type of protein</option>
                <option>Meat</option>
                <option>Fish</option>
                <option>Eggs</option>
                <option>Legumes</option>
                <option>Seeds and nuts</option>
              </select>
            </form>
          </div>
          <div className="recipes">
            {recipes?.length === 0 ? (
              <div className="no-recipes">
                <p>
                  Be the first to create a new recipe{" "}
                  <Link to="/recipes/create">here</Link>
                </p>
                <img src="../../empty-recipe.jpeg" alt="" />
              </div>
            ) : (
              renderRecipes()
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipesList;
