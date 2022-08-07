import axios from "axios";
import React, { useEffect, useState } from "react";

function PlanningsList() {
  const [weeklyPlans, setWeeklyPlans] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const background = ["../../week1.jpg", "../../week2.jpeg"];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/weeklyplans`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setWeeklyPlans(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  return (
    <div>
      {weeklyPlans?.map((weeklyPlan) => {
        return (
          <div
            style={{
              backgroundImage: `url(${
                background[Math.floor(Math.random() * background.length)]
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            key={weeklyPlan._id}
          >
            <h3>{weeklyPlan.startDate}</h3>
            <h1>{weeklyPlan.mealType}</h1>
            <h1>{weeklyPlan.weeklyRecipes}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default PlanningsList;
