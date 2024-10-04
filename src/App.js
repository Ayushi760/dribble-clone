import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { GlobalStateContext, GlobalStateProvider } from "./context/GlobalStateContext";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
