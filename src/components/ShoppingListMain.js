import React from "react";
import { Route, Routes } from "react-router-dom";
import ShoppingList from "../pages/ShoppingList";
import ShoppingListDetails from "../pages/ShoppingListDetails";

function ShoppingListMain(props) {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div
            className="col-5"
            style={{ maxHeight: 90 + "vh", overflow: "scroll" }}
          >
            <div className="list-group">
              <ShoppingList list={props.list} />;
            </div>
          </div>
          <Routes>
            <Route
              path="/:shoppingListId"
              element={<ShoppingListDetails details={props.list} />}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListMain;
