import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PlanningsDetails from "../pages/PlanningsDetails";
import PlanningsList from "../pages/PlanningsList";
import "./PlanningsMain.css";

function PlanningsMain() {
  const [weeklyPlans, setWeeklyPlans] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    getAllWeeklyPlans();
  }, []);

  const getAllWeeklyPlans = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/weeklyplans`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setWeeklyPlans(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <div className="container">
          <div>
            <PlanningsList
              weeklyPlans={weeklyPlans}
              refreshWeeklyPlans={getAllWeeklyPlans}
            />
          </div>
        </div>
        <div>
          <Routes>
            <Route
              path="/:weeklyPlanId"
              element={
                <PlanningsDetails
                  details={weeklyPlans}
                  refreshWeeklyPlans={getAllWeeklyPlans}
                />
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default PlanningsMain;
