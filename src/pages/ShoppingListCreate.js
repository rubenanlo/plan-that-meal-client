import axios from "axios";
import { nanoid } from "nanoid";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ShoppingListCreate(props) {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const { isLoading } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    const newItem = {
      _id: nanoid(),
      description: description,
      quantity: quantity,
    };
    setItems([...items, newItem]);

    setDescription("");
    setQuantity("");
  };

  // console.log(items[0].description);

  const handleSubmit = () => {
    setErrorMsg("");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/shoppingitems`,
        { items },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        navigate("/shoppingitems");
      })

      .catch((error) => {
        setErrorMsg("oops, error creating a shopping list");
        console.log(error);
      });
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="AddRecipe">
            <h1>Create your shopping list</h1>
            {errorMsg && <p className="error">{errorMsg}</p>}
            <div className="Input-value">
              <label>items: </label>
              <input
                className="add-items"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
              <label>Quantity</label>
              <input
                className="add-quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button onClick={() => handleAddButtonClick()}>Add</button>
              {items.map((item, index) => {
                return (
                  <div key={item._id}>
                    <p>
                      {item.description} x {item.quantity}
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setItems(
                          items.filter((element) => element._id !== item._id)
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

              <button onClick={() => handleSubmit()}>Save shopping list</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingListCreate;
