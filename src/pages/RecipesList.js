import { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./RecipeList.css";
import "../index.css";

function RecipesList(props) {
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    props.refreshRecipes();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("protein") || "";
  const handleSearch = (e) => {
    const protein = e.target.value;
    return protein ? setSearchParams({ protein }) : setSearchParams({});
  };

  const renderRecipes = () => {
    let result;
    searchTerm !== "All"
      ? (result = props.recipes
          .filter((recipe) => recipe.protein.includes(searchTerm))
          .map((recipe) => {
            return (
              <div className="recipe" key={recipe._id}>
                <Link className="link-no-format" to={`/recipes/${recipe._id}`}>
                  <h3>{recipe.title}</h3>
                  <img src={recipe.img} alt="recipe" />
                </Link>
                <div className="divider"></div>
              </div>
            );
          }))
      : (result = props.recipes.map((recipe) => {
          return (
            <div className="recipe" key={recipe._id}>
              <Link className="link-no-format" to={`/recipes/${recipe._id}`}>
                <h3>{recipe.title}</h3>
                <img src={recipe.img} alt="recipe" />
              </Link>
              <div className="divider"></div>
            </div>
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
          <div className="search">
            <p>Search by type of protein </p>
            <form onChange={handleSearch}>
              <select
                type="text"
                name="protein"
                value={searchTerm}
                className="form-search"
                placeholder="search by type of protein"
                onChange={(e) => {
                  setSearchParams({ protein: e.target.value });
                }}
              >
                <option></option>
                <option>Meat</option>
                <option>Fish</option>
                <option>Eggs</option>
                <option>Legumes</option>
                <option>Seeds and nuts</option>
              </select>
            </form>
          </div>
          <div className="recipes">
            {props.recipes.length === 0 ? (
              <div>
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
