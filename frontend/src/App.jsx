import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import PetSetup from "./pages/petSetup";
import PetDashboard from "./pages/PetDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/selection" element={<PetSetup/>} />

        <Route path="/home" element={<PetDashboard/>} />

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
