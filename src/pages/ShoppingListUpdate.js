import axios from "axios";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ShoppingListUpdate() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const { shoppingListId } = useParams();

  const [errorMsg, setErrorMsg] = useState("");

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    const newItem = {
      id: nanoid(),
      description: description,
      quantity: quantity,
    };
    setItems([...items, newItem]);
    setDescription("");
    setQuantity("");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/shoppingitems/${shoppingListId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneList = response.data;
        setItems(oneList.items);
      })
      .catch((error) => console.log(error));
  }, [shoppingListId, storedToken]);

  const handleSubmit = () => {
    setErrorMsg("");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/shoppingitems/${shoppingListId}`,
        { items },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        navigate(`/shoppingitems/${shoppingListId}`);
      })

      .catch((error) => {
        setErrorMsg("oops, error editing a shopping list");
        console.log(error);
      });
  };

  if (items === null) {
    return <>loading...</>;
  }

  return (
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
          <span>gr</span>
          <button onClick={() => handleAddButtonClick()}>Add</button>
          {items.map((items, index) => {
            return (
              <div key={items.id}>
                <p>
                  {items.description} gr. {items.quantity}
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDescription(items.filter((x) => x.id !== items.id));
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
  );
}

export default ShoppingListUpdate;
