import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PlanningsDetails() {
  const [weeklyPlan, setWeeklyPlan] = useState("");
  const storedToken = localStorage.getItem("authToken");
  const { weeklyPlanId } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/weeklyplans/${weeklyPlanId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneWeeklyPlan = response.data;
        setWeeklyPlan(oneWeeklyPlan);
      })
      .catch((error) => console.log(error));
  }, [weeklyPlanId, storedToken]);

  return (
    <div>
      {weeklyPlan && (
        <>
          <div>
            <h2>{moment(weeklyPlan.startDate).format("dddd")}</h2>
            <h3>Lunch</h3>
            <p>{weeklyPlan.mealRecipe11.title}</p>
            <h3>Dinner</h3>
            <p>{weeklyPlan.mealRecipe12.title}</p>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(1, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <p>{weeklyPlan.mealRecipe21.title}</p>
            <h3>Dinner</h3>
            <p>{weeklyPlan.mealRecipe22.title}</p>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(2, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <p>{weeklyPlan.mealRecipe31.title}</p>
            <h3>Dinner</h3>
            <p>{weeklyPlan.mealRecipe32.title}</p>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(3, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <p>{weeklyPlan.mealRecipe41.title}</p>
            <h3>Dinner</h3>
            <p>{weeklyPlan.mealRecipe42.title}</p>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(4, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <p>{weeklyPlan.mealRecipe51.title}</p>
            <h3>Dinner</h3>
            <p>{weeklyPlan.mealRecipe52.title}</p>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(5, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <p>{weeklyPlan.mealRecipe61.title}</p>
            <h3>Dinner</h3>
            <p>{weeklyPlan.mealRecipe62.title}</p>
          </div>
          <div>
            <h2>
              {moment(weeklyPlan.startDate).add(6, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <p>{weeklyPlan.mealRecipe71.title}</p>
            <h3>Dinner</h3>
            <p>{weeklyPlan.mealRecipe72.title}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default PlanningsDetails;
