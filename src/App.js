import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/LoginSignup/LoginPage";
import PlanningsCreate from "./pages/WeeklyPlans/PlanningsCreate";
import RecipeDetails from "./pages/Recipes/RecipeDetails";
import RecipeCreate from "./pages/Recipes/RecipeCreate";
import RecipeUpdate from "./pages/Recipes/RecipeUpdate";
import RecipesList from "./pages/Recipes/RecipesList";
import SignupPage from "./pages/LoginSignup/SignupPage";
import ShoppingListCreate from "./pages/ShoppingList/ShoppingListCreate";
import ShoppingListUpdate from "./pages/ShoppingList/ShoppingListUpdate";
import NotFound from "./components/NotFound/NotFound";
import ShoppingListMain from "./components/ShoppingHub/ShoppingListMain";
import PlanningsMain from "./components/PlanningHub/PlanningsMain";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Footer />
              <HomePage />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <Footer />
              <SignupPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Footer />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/recipes"
          element={
            <>
              <Navbar />
              <Footer />
              <RecipesList />
            </>
          }
        />
        <Route
          path="/recipes/:recipeId"
          element={
            <>
              <Navbar />
              <Footer />
              <RecipeDetails />
            </>
          }
        />
        <Route
          path="/recipes/edit/:recipeId"
          element={
            <>
              <Navbar />
              <Footer />
              <RecipeUpdate />
            </>
          }
        />
        <Route
          path="/recipes/create"
          element={
            <>
              <Navbar />
              <Footer />
              <RecipeCreate />
            </>
          }
        />
        <Route
          path="/weeklyplans/*"
          element={
            <>
              <Navbar />
              <Footer />
              <PlanningsMain />
            </>
          }
        />
        <Route
          path="/weeklyplans/create"
          element={
            <>
              <Navbar />
              <Footer />
              <PlanningsCreate />
            </>
          }
        />
        <Route
          path="/shoppingitems/*"
          element={
            <>
              <Navbar />
              <Footer />
              <ShoppingListMain />
            </>
          }
        />
        <Route
          path="/shoppingitems/create"
          element={
            <>
              <Navbar />
              <Footer />
              <ShoppingListCreate />
            </>
          }
        />
        <Route
          path="/shoppingitems/edit/:shoppingListId"
          element={
            <>
              <Navbar />
              <Footer />
              <ShoppingListUpdate />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
