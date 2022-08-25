import moment from "moment";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function PlanningsList({ refreshWeeklyPlans, weeklyPlans }) {
  useEffect(() => {
    refreshWeeklyPlans();
  }, [refreshWeeklyPlans]);

  return (
    <>
      <div>
        {weeklyPlans?.map((weeklyPlan) => {
          return (
            <Link
              className="plan-name"
              to={`/weeklyplans/${weeklyPlan._id}`}
              key={weeklyPlan._id}
            >
              <h3 className="weekly-plan">
                Week of {moment(weeklyPlan.startDate).format("DD MMMM YYYY")}
              </h3>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default PlanningsList;
