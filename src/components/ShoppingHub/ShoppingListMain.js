import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import ShoppingList from "../../pages/ShoppingList/ShoppingList";
import ShoppingListDetails from "../../pages/ShoppingList/ShoppingListDetails";
import { AuthContext } from "../../context/auth.context";

function ShoppingListMain() {
  const [list, setList] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const { isLoading } = useContext(AuthContext);

  const getAllShoppingLists = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/shoppingitems`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setList(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  useEffect(() => {
    getAllShoppingLists();
  }, [getAllShoppingLists]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {list?.length === 0 ? (
            <div className="no-data">
              <p>
                There is still no shopping list? Get in there and create one{" "}
                <NavLink to="/shoppingitems/create">here</NavLink>
              </p>
              <img src="../../empty-recipe.jpeg" alt="" />
            </div>
          ) : (
            list?.length > 0 && (
              <div>
                <div className="create-option">
                  <p> Want to create a new shopping list?</p>
                  <NavLink to="/shoppingitems/create">Go for it!</NavLink>
                </div>
                <div className="planning-list">
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
            )
          )}
        </div>
      )}
    </div>
  );
}

export default ShoppingListMain;
