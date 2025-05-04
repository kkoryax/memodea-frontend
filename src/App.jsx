import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext"
import Home from "./pages/Home";
import NavigatorTab from "./components/NavigatorTab";
import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
        <AuthProvider>
          <NavigatorTab />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
    </Router>
  );
}