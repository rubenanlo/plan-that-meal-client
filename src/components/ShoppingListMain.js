import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ShoppingList from "../pages/ShoppingList";
import ShoppingListDetails from "../pages/ShoppingListDetails";
import "./PlanningsMain.css";

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
      <div>
        <div className="container">
          <div>
            <ShoppingList
              list={list}
              refreshShoppingLists={getAllShoppingLists}
            />
          </div>
        </div>
        <div>
          <Routes>
            <Route
              path="/:shoppingListId"
              element={
                <ShoppingListDetails
                  details={list}
                  refreshShoppingLists={getAllShoppingLists}
                />
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListMain;
