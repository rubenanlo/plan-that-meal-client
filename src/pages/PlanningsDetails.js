import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PlanningsDetails.css";

function PlanningsDetails() {
  const [weeklyPlan, setWeeklyPlan] = useState("");
  const storedToken = localStorage.getItem("authToken");
  const { weeklyPlanId } = useParams();

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
      })
      .catch((err) => console.log(err));
  };

  if (weeklyPlan === null) {
    return <>loading...</>;
  }

  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <button onClick={deleteWeeklyPlan}>Delete</button>
      </div>

      {weeklyPlan && (
        <div className="container-planning">
          <div className="single-day">
            <h2>{moment(weeklyPlan.startDate).format("dddd")}</h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[0]._id}`}>
              <p>{weeklyPlan.mealRecipes[0].title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[1]._id}`}>
              <p>{weeklyPlan.mealRecipes[1].title}</p>
            </Link>
          </div>
          <div className="single-day">
            <h2>
              {moment(weeklyPlan.startDate).add(1, "days").format("dddd")}
            </h2>
            <div>
              <h3>Lunch</h3>
              <Link to={`/recipes/${weeklyPlan.mealRecipes[2]._id}`}>
                <p>{weeklyPlan.mealRecipes[2].title}</p>
              </Link>
              <h3>Dinner</h3>
              <Link to={`/recipes/${weeklyPlan.mealRecipes[3]._id}`}>
                <p>{weeklyPlan.mealRecipes[3].title}</p>
              </Link>
            </div>
          </div>
          <div className="single-day">
            <h2>
              {moment(weeklyPlan.startDate).add(2, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[4]._id}`}>
              <p>{weeklyPlan.mealRecipes[4].title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[5]._id}`}>
              <p>{weeklyPlan.mealRecipes[5].title}</p>
            </Link>
          </div>
          <div className="single-day">
            <h2>
              {moment(weeklyPlan.startDate).add(3, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[6]._id}`}>
              <p>{weeklyPlan.mealRecipes[6].title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[7]._id}`}>
              <p>{weeklyPlan.mealRecipes[7].title}</p>
            </Link>
          </div>
          <div className="single-day">
            <h2>
              {moment(weeklyPlan.startDate).add(4, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[8]._id}`}>
              <p>{weeklyPlan.mealRecipes[8].title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[9]._id}`}>
              <p>{weeklyPlan.mealRecipes[9].title}</p>
            </Link>
          </div>
          <div className="single-day">
            <h2>
              {moment(weeklyPlan.startDate).add(5, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[10]._id}`}>
              <p>{weeklyPlan.mealRecipes[10].title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[11]._id}`}>
              <p>{weeklyPlan.mealRecipes[11].title}</p>
            </Link>
          </div>
          <div className="single-day">
            <h2>
              {moment(weeklyPlan.startDate).add(6, "days").format("dddd")}
            </h2>
            <h3>Lunch</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[12]._id}`}>
              <p>{weeklyPlan.mealRecipes[12].title}</p>
            </Link>
            <h3>Dinner</h3>
            <Link to={`/recipes/${weeklyPlan.mealRecipes[13]._id}`}>
              <p>{weeklyPlan.mealRecipes[13].title}</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanningsDetails;
