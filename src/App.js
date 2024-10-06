import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { GlobalStateContext, GlobalStateProvider } from "./context/GlobalStateContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useContext, useEffect } from "react";

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
    </BrowserRouter>
  );
}

export default App;
