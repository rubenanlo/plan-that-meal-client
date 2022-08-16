import moment from "moment";
import { useEffect } from "react";

function PlanningsList(props) {
  useEffect(() => {
    props.refreshWeeklyPlans();
  }, []);

  return (
    <>
      <div>
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
    </>
  );
}

export default PlanningsList;
