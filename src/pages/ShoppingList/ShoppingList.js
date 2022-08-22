import moment from "moment";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function ShoppingList(props) {
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    props.refreshShoppingLists();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {props.list.length === 0 && (
            <div>
              <p>
                There is still no shopping list? Get in there and create one{" "}
                <NavLink to="/shoppingitems/create">here</NavLink>
              </p>
              <img
                style={{ width: "20vw" }}
                src="../../empty-recipe.jpeg"
                alt=""
              />
            </div>
          )}
          {props.list?.map((element) => {
            return (
              <div key={element._id}>
                <NavLink to={`/shoppingitems/${element._id}`}>
                  <p>
                    From {moment(element?.date).format("dddd, DD MMMM yyyy")}
                  </p>
                </NavLink>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ShoppingList;
