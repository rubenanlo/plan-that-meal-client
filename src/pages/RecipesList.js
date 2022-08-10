import { useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function RecipesList(props) {
  const navigate = useNavigate();
  const { isLoading } = useContext(AuthContext);

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
          }))
      : (result = props.recipes.map((recipe) => {
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
        }));

    return result;
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          <div>
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
                <option>All</option>
                <option>Meat</option>
                <option>Fish</option>
                <option>Eggs</option>
                <option>Legumes</option>
                <option>Seeds and nuts</option>
              </select>
            </form>
          </div>

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
      )}
    </>
  );
}

export default RecipesList;
