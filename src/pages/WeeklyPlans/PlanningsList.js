import moment from "moment";
import { useEffect } from "react";

function PlanningsList({ refreshWeeklyPlans, weeklyPlans }) {
  useEffect(() => {
    refreshWeeklyPlans();
  }, [refreshWeeklyPlans]);

  return (
    <>
      <div>
        {weeklyPlans?.map((weeklyPlan) => {
          return (
            <a
              className="plan-name"
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
    </>
  );
}

export default PlanningsList;
