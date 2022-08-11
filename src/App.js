import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlanningsCreate from "./pages/PlanningsCreate";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeCreate from "./pages/RecipeCreate";
import RecipeUpdate from "./pages/RecipeUpdate";
import RecipesList from "./pages/RecipesList";
import SignupPage from "./pages/SignupPage";
import ShoppingListCreate from "./pages/ShoppingListCreate";
import ShoppingListUpdate from "./pages/ShoppingListUpdate";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./components/NotFound";
import ShoppingListMain from "./components/ShoppingListMain";
import PlanningsMain from "./components/PlanningsMain";

function App() {
  const [recipes, setRecipes] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    getAllRecipes();
  }, []);

  const getAllRecipes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  };

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
              <RecipesList recipes={recipes} refreshRecipes={getAllRecipes} />
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
              <RecipeCreate />
            </>
          }
        />
        <Route
          path="/weeklyplans/*"
          element={
            <>
              <Navbar />
              <PlanningsMain />
            </>
          }
        />
        <Route
          path="/weeklyplans/create"
          element={
            <>
              <Navbar />
              <PlanningsCreate recipes={recipes} />
            </>
          }
        />
        <Route
          path="/shoppingitems/*"
          element={
            <>
              <Navbar />
              <ShoppingListMain />
            </>
          }
        />
        <Route
          path="/shoppingitems/create"
          element={
            <>
              <Navbar />
              <ShoppingListCreate />
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
