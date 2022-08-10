import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlanningsCreate from "./pages/PlanningsCreate";
import PlanningsDetails from "./pages/PlanningsDetails";
import PlanningsList from "./pages/PlanningsList";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeCreate from "./pages/RecipeCreate";
import RecipeUpdate from "./pages/RecipeUpdate";
import RecipesList from "./pages/RecipesList";
import SignupPage from "./pages/SignupPage";
import ShoppingList from "./pages/ShoppingList";
import ShoppingListDetails from "./pages/ShoppingListDetails";
import ShoppingListCreate from "./pages/ShoppingListCreate";
import ShoppingListUpdate from "./pages/ShoppingListUpdate";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./components/NotFound";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [weeklyPlans, setWeeklyPlans] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const [list, setList] = useState([]);

  useEffect(() => {
    getAllRecipes();
    getAllPlannings();
    getAllShoppingLists();
  }, []);

  const getAllRecipes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  };

  const getAllPlannings = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/weeklyplans`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setWeeklyPlans(response.data))
      .catch((error) => console.log(error));
  };

  const getAllShoppingLists = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/shoppingitems`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setList(response.data))
      .catch((error) => console.log(error));
  };

  if (list === null) {
    return <>loading...</>;
  }

  if (weeklyPlans === null) {
    return <>loading...</>;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <SignupPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/recipes"
          element={
            <>
              <Navbar />
              <RecipesList recipes={recipes} />
            </>
          }
        />
        <Route
          path="/recipes/:recipeId"
          element={
            <>
              <Navbar />
              <RecipeDetails />
            </>
          }
        />
        <Route
          path="/recipes/edit/:recipeId"
          element={
            <>
              <Navbar />
              <RecipeUpdate />
            </>
          }
        />
        <Route
          path="/recipes/create"
          element={
            <>
              <Navbar />
              <RecipeCreate refreshRecipes={getAllRecipes} />
            </>
          }
        />
        <Route
          path="/weeklyplans"
          element={
            <>
              <Navbar />
              <PlanningsList weeklyPlans={weeklyPlans} />
            </>
          }
        />
        <Route
          path="/weeklyplans/:weeklyPlanId"
          element={
            <>
              <Navbar />
              <PlanningsDetails />
            </>
          }
        />
        <Route
          path="/weeklyplans/create"
          element={
            <>
              <Navbar />
              <PlanningsCreate
                recipes={recipes}
                refreshPlannings={getAllPlannings}
              />
            </>
          }
        />
        <Route
          path="/shoppingitems"
          element={
            <>
              <Navbar />
              <ShoppingList list={list} />
            </>
          }
        />
        <Route
          path="/shoppingitems/:shoppingListId"
          element={
            <>
              <Navbar />
              <ShoppingListDetails />
            </>
          }
        />
        <Route
          path="/shoppingitems/create"
          element={
            <>
              <Navbar />
              <ShoppingListCreate refreshShoppingLists={getAllShoppingLists} />
            </>
          }
        />
        <Route
          path="/shoppingitems/edit/:shoppingListId"
          element={
            <>
              <Navbar />

              <ShoppingListUpdate />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
