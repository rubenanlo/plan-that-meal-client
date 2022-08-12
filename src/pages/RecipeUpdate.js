import axios from "axios";
import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./RecipeCreateUpdate.css";

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
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="form">
          <h2>Create your recipe</h2>
          {errorMsg && <p className="error">{errorMsg}</p>}
          <p className="required-fields">(*) required fields</p>
          <div>
            <form
              id="recipe-form"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="field">
                <label>Title:(*)</label>
                <input
                  className="img-input"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Image:</label>
                <input type="file" onChange={(e) => handleFileUpload(e)} />
              </div>

              <div className="field">
                <label>Main protein:(*)</label>
                <div className="protein-field">
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
                  </div>
                  <div>
                    <button
                      name="protein"
                      type="button"
                      value={protein}
                      style={{
                        backgroundColor:
                          protein === "Legumes" ? "var(--purple-dark)" : "",
                        color:
                          protein === "Legumes"
                            ? "var(--text-light)"
                            : "var(--text-dark)",
                      }}
                      onClick={() => setProtein("Legumes")}
                    >
                      Legumes
                    </button>
                    <button
                      name="protein"
                      type="button"
                      value={protein}
                      style={{
                        backgroundColor:
                          protein === "Seeds and nuts"
                            ? "var(--purple-dark)"
                            : "",
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
                </div>
              </div>
              <div className="field">
                <label>Serving:</label>
                <input
                  type="number"
                  min="0"
                  name="serving"
                  value={serving}
                  onChange={(e) => setServing(e.target.value)}
                />
              </div>
            </form>

            <div id="add-ingredient">
              <div className="field">
                <label>Ingredients: </label>
                <div className="ingredient">
                  <input
                    className="ingredient"
                    placeholder="Add ingredient"
                    value={inputIngredient}
                    onChange={(e) => setInputIngredient(e.target.value)}
                  ></input>
                  <input
                    className="ingredient"
                    placeholder="Add quantity (gr.)"
                    value={inputQuantity}
                    onChange={(e) => setInputQuantity(e.target.value)}
                  />
                </div>

                <button
                  className="add"
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
              {ingredients.map((ingredient) => {
                return (
                  <div key={ingredient.id} className="show-ingredient">
                    <p>
                      {ingredient.quantity} gr. {ingredient.ingredient}
                    </p>
                    <button
                      className="add"
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
            </div>

            <form id="recipe-form">
              <div className="field">
                <label>Description:</label>
                <textarea
                  type="textarea"
                  cols={40}
                  rows={10}
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </form>

            <button
              className="back"
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
        </div>
      )}
    </div>
  );
}

export default RecipesUpdate;
