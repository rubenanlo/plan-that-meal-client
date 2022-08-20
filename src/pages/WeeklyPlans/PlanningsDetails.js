import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function PlanningsDetails(props) {
  const [weeklyPlan, setWeeklyPlan] = useState("");
  const storedToken = localStorage.getItem("authToken");
  const { weeklyPlanId } = useParams();
  const { isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

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

  const deleteWeeklyPlan = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/weeklyplans/${weeklyPlanId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/weeklyplans");
        props.refreshWeeklyPlans();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {weeklyPlan && (
            <div className="container-daily-plan">
              <div className="single-day">
                <h2>{moment(weeklyPlan.startDate).format("dddd")}</h2>
                <h3>
                  Lunch:{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[0]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[0]?.title.slice(0, 7)}...
                  </Link>
                </h3>
                <h3>
                  Dinner:{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[1]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[1]?.title.slice(0, 7)}...
                  </Link>
                </h3>
              </div>
              <div className="single-day">
                <h2>
                  {moment(weeklyPlan.startDate).add(1, "days").format("dddd")}
                </h2>
                <div>
                  <h3>
                    Lunch{" "}
                    <Link
                      className="link-planning"
                      to={`/recipes/${weeklyPlan.mealRecipes[2]?._id}`}
                    >
                      {weeklyPlan.mealRecipes[2]?.title.slice(0, 7)}...
                    </Link>
                  </h3>
                  <h3>
                    Dinner{" "}
                    <Link
                      className="link-planning"
                      to={`/recipes/${weeklyPlan.mealRecipes[3]?._id}`}
                    >
                      {weeklyPlan.mealRecipes[3]?.title.slice(0, 7)}...
                    </Link>
                  </h3>
                </div>
              </div>
              <div className="single-day">
                <h2>
                  {moment(weeklyPlan.startDate).add(2, "days").format("dddd")}
                </h2>
                <h3>
                  Lunch{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[4]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[4]?.title.slice(0, 7)}...
                  </Link>
                </h3>
                <h3>
                  Dinner{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[5]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[5]?.title.slice(0, 7)}...
                  </Link>
                </h3>
              </div>
              <div className="single-day">
                <h2>
                  {moment(weeklyPlan.startDate).add(3, "days").format("dddd")}
                </h2>
                <h3>
                  Lunch{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[6]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[6]?.title.slice(0, 7)}...
                  </Link>
                </h3>
                <h3>
                  Dinner{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[7]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[7]?.title.slice(0, 7)}...
                  </Link>
                </h3>
              </div>
              <div className="single-day">
                <h2>
                  {moment(weeklyPlan.startDate).add(4, "days").format("dddd")}
                </h2>
                <h3>
                  Lunch{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[8]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[8]?.title.slice(0, 7)}...
                  </Link>
                </h3>
                <h3>
                  Dinner{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[9]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[9]?.title.slice(0, 7)}...
                  </Link>
                </h3>
              </div>
              <div className="single-day">
                <h2>
                  {moment(weeklyPlan.startDate).add(5, "days").format("dddd")}
                </h2>
                <h3>
                  Lunch{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[10]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[10]?.title.slice(0, 7)}...
                  </Link>
                </h3>
                <h3>
                  Dinner{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[11]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[11]?.title.slice(0, 7)}...
                  </Link>
                </h3>
              </div>
              <div className="single-day">
                <h2>
                  {moment(weeklyPlan.startDate).add(6, "days").format("dddd")}
                </h2>
                <h3>
                  Lunch{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[12]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[12]?.title.slice(0, 7)}
                    ...
                  </Link>
                </h3>
                <h3 className="last-item">
                  Dinner{" "}
                  <Link
                    className="link-planning"
                    to={`/recipes/${weeklyPlan.mealRecipes[13]?._id}`}
                  >
                    {weeklyPlan.mealRecipes[13]?.title.slice(0, 7)}...
                  </Link>
                </h3>
              </div>
            </div>
          )}
          <button className="specificButton" onClick={deleteWeeklyPlan}>
            Delete
          </button>
        </div>
      )}
    </>
  );
}

export default PlanningsDetails;
