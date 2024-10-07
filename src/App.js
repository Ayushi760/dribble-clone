import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { GlobalStateContext, GlobalStateProvider } from "./context/GlobalStateContext";
import { useContext, useEffect } from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const { dispatch } = useContext(GlobalStateContext);
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await fetch("http://localhost:3001/categories")
        .then((response) => response.json())
        .catch((error) => console.error(error));

      if (categoriesData) {
        console.log(categoriesData);
        dispatch({ type: "SET_CATEGORIES", payload: categoriesData });
      }
    };

    fetchCategories();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
