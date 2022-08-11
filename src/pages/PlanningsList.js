import moment from "moment";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function PlanningsList(props) {
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    props.refreshWeeklyPlans();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {props.weeklyPlans?.length === 0 && (
            <div>
              <p>
                Not a weekly plan yet? Not to worry, we've got you covered, you
                can create your first one{" "}
                <Link to="/weeklyplans/create">here</Link>
              </p>
              <img src="../../empty-recipe.jpeg" alt="" />
            </div>
          )}
          {props.weeklyPlans?.map((weeklyPlan) => {
            return (
              <a
                className="link"
                href={`/weeklyplans/${weeklyPlan._id}`}
                key={weeklyPlan._id}
              >
                <div>
                  <h3 className="weekly-plan">
                    {moment(weeklyPlan.startDate).format("dddd, DD MMMM YYYY")}
                  </h3>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}

export default PlanningsList;
