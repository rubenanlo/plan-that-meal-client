import axios from "axios";
import React, { useEffect, useState } from "react";

function ShoppingList() {
  const [shoppingList, setShoppingList] = useState("");
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/shoppingitems`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setShoppingList(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  return (
    <div>
      {shoppingList?.map((item) => {
        return (
          <div>
            <p>{item.description}</p>;<p>{item.quantity}</p>;
          </div>
        );
      })}
    </div>
  );
}

export default ShoppingList;
