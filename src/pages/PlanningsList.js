import axios from "axios";
import moment from "moment";
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
          <a href={`/weeklyplans/${weeklyPlan._id}`} key={weeklyPlan._id}>
            <div
              style={{
                backgroundImage: `url(${
                  background[Math.floor(Math.random() * background.length)]
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3>
                {moment(weeklyPlan.startDate).format("dddd, DD MMMM YYYY")}
              </h3>
            </div>
          </a>
        );
      })}
    </div>
  );
}

export default PlanningsList;
