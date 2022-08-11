import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PlanningsDetails from "../pages/PlanningsDetails";
import PlanningsList from "../pages/PlanningsList";

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
      <div className="container">
        <div className="row">
          <div
            className="col-5"
            style={{ maxHeight: 90 + "vh", overflow: "scroll" }}
          >
            <div className="list-group">
              <PlanningsList
                weeklyPlans={weeklyPlans}
                refreshWeeklyPlans={getAllWeeklyPlans}
              />
            </div>
            <Routes>
              <Route
                path="/:weeklyPlanId"
                element={<PlanningsDetails details={weeklyPlans} />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanningsMain;
