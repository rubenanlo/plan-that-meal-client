import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import PlanningsDetails from "../../pages/PlanningsDetails";
import PlanningsList from "../../pages/PlanningsList";
import "./PlanningsMain.css";

function PlanningsMain() {
  const [weeklyPlans, setWeeklyPlans] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const { isLoading } = useContext(AuthContext);

  const getAllWeeklyPlans = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/weeklyplans`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setWeeklyPlans(response.data))
      .catch((error) => console.log(error));
  }, [storedToken]);

  useEffect(() => {
    getAllWeeklyPlans();
  }, [getAllWeeklyPlans]);

  return (
    <div className="container-planning">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {weeklyPlans.length === 0 && (
            <div>
              <p>
                Not a weekly plan yet? Not to worry, we've got you covered, you
                can create your first one{" "}
                <Link to="/weeklyplans/create">here</Link>
              </p>
              <img
                style={{ width: "20vw" }}
                src="../../empty-recipe.jpeg"
                alt=""
              />
            </div>
          )}
          <div>
            <div>
              <div className="planning-list">
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
      )}
    </div>
  );
}

export default PlanningsMain;
