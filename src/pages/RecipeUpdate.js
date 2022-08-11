import axios from "axios";
import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function RecipesUpdate() {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serving, setServing] = useState("");
  const [protein, setProtein] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [inputIngredient, setInputIngredient] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const { recipeId } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  const { isLoading } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("img", e.target.files[0]);

    return axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setImg(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleAddButtonClick = () => {
    const newIngredient = {
      id: nanoid(),
      ingredient: inputIngredient,
      quantity: inputQuantity,
    };
    setIngredients([...ingredients, newIngredient]);
    setInputIngredient("");
    setInputQuantity("");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecipe = response.data;
        setImg(oneRecipe.img);
        setTitle(oneRecipe.title);
        setDescription(oneRecipe.description);
        setServing(oneRecipe.serving);
        setProtein(oneRecipe.protein);
        setIngredients(oneRecipe.ingredients);
      })
      .catch((error) => console.log(error));
  }, [recipeId, storedToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/recipes/${recipeId}`,
        { img, title, description, serving, protein, ingredients },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        navigate(`/recipes/${recipeId}`);
        // window.location.reload();
      })
      .catch((error) => {
        setErrorMsg("oops, error updating this recipe");
        console.log(error);
      });
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="Form">
          <h1>Update your recipe</h1>
          {errorMsg && <p className="error">{errorMsg}</p>}
          <span>(*) required fields</span>

          <form
            id="recipe-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <label>Image:</label>
              <input type="file" onChange={(e) => handleFileUpload(e)} />
            </div>

            <div>
              <label>Title:(*)</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Main protein:(*)</label>
              <div>
                <button
                  type="button"
                  name="protein"
                  value={protein}
                  style={{
                    backgroundColor:
                      protein === "Meat" ? "var(--purple-dark)" : "",
                    color:
                      protein === "Meat"
                        ? "var(--text-light)"
                        : "var(--text-dark)",
                  }}
                  onClick={() => setProtein("Meat")}
                >
                  Meat
                </button>
                <button
                  name="protein"
                  type="button"
                  value={protein}
                  style={{
                    backgroundColor:
                      protein === "Fish" ? "var(--purple-dark)" : "",
                    color:
                      protein === "Fish"
                        ? "var(--text-light)"
                        : "var(--text-dark)",
                  }}
                  onClick={() => setProtein("Fish")}
                >
                  Fish
                </button>
              </div>
              <div>
                <button
                  name="protein"
                  type="button"
                  value={protein}
                  style={{
                    backgroundColor:
                      protein === "Eggs" ? "var(--purple-dark)" : "",
                    color:
                      protein === "Eggs"
                        ? "var(--text-light)"
                        : "var(--text-dark)",
                  }}
                  onClick={() => setProtein("Eggs")}
                >
                  Eggs
                </button>
                <button
                  name="protein"
                  style={{
                    backgroundColor:
                      protein === "Legumes" ? "var(--purple-dark)" : "",
                    color:
                      protein === "Legumes"
                        ? "var(--text-light)"
                        : "var(--text-dark)",
                  }}
                  type="button"
                  value={protein}
                  onClick={() => setProtein("Legumes")}
                >
                  Legumes
                </button>
              </div>
              <button
                name="protein"
                type="button"
                value={protein}
                style={{
                  backgroundColor:
                    protein === "Seeds and nuts" ? "var(--purple-dark)" : "",
                  color:
                    protein === "Seeds and nuts"
                      ? "var(--text-light)"
                      : "var(--text-dark)",
                }}
                onClick={() => setProtein("Seeds and nuts")}
              >
                Seeds and nuts
              </button>
            </div>
            <div>
              <label>Serving:</label>
              <input
                type="number"
                min="0"
                name="serving"
                value={serving}
                onChange={(e) => setServing(e.target.value)}
              />
            </div>
            <div>
              <label>Description:(*)</label>
              <textarea
                required
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
          <div id="add-ingredient">
            <label>Ingredient: </label>
            <input
              className="add-ingredients"
              value={inputIngredient}
              onChange={(e) => setInputIngredient(e.target.value)}
            ></input>
            <label>Quantity</label>
            <input
              className="add-quantity"
              value={inputQuantity}
              onChange={(e) => setInputQuantity(e.target.value)}
            />
            <span>gr</span>
            <button
              onClick={() => {
                if (inputIngredient && inputQuantity) {
                  handleAddButtonClick();
                } else {
                  alert("Please add an ingredient and quantity");
                }
              }}
            >
              Add
            </button>
          </div>

          {ingredients.map((ingredient, index) => {
            return (
              <div key={ingredient.id}>
                <p>
                  {ingredient.quantity} gr. {ingredient.ingredient}
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIngredients(
                      ingredients.filter((x) => x.id !== ingredient.id)
                    );
                  }}
                >
                  x
                </button>
              </div>
            );
          })}
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          <button type="submit" form="recipe-form">
            Submit
          </button>
        </div>
      )}
    </>
  );
}

export default RecipesUpdate;
