import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ShoppingList from "../pages/ShoppingList";
import ShoppingListDetails from "../pages/ShoppingListDetails";

function ShoppingListMain() {
  const [list, setList] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    getAllShoppingLists();
  }, []);

  const getAllShoppingLists = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/shoppingitems`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setList(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div
            className="col-5"
            style={{ maxHeight: 90 + "vh", overflow: "scroll" }}
          >
            <div className="list-group">
              <ShoppingList
                list={list}
                refreshShoppingLists={getAllShoppingLists}
              />
            </div>
          </div>
          <Routes>
            <Route
              path="/:shoppingListId"
              element={<ShoppingListDetails details={list} />}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListMain;
