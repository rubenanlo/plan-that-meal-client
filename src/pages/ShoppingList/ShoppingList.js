import moment from "moment";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function ShoppingList({ refreshShoppingLists, list }) {
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    refreshShoppingLists();
  }, [refreshShoppingLists]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {list?.map((element) => {
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
