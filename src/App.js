
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Logout from "./pages/Logout";
import NavBar from "./components/NavBar";
import { SessionProvider } from "./SessionContext";  
import { useEffect } from "react";
import { getCdApi } from "./bc";

function UseBioCatchContextPerRoute() {
  const location = useLocation();
  useEffect(() => {
    const cdApi = getCdApi();
    if (!cdApi) return;
    const map = {
      "/": "home_screen",
      "/login": "login_screen",
      "/payment": "payment_screen",
      "/logout": "logout_screen",
    };
    cdApi.changeContext(map[location.pathname] || "unknown_screen");
  }, [location]);
  return null;
}

export default function App() {
  return (
    <SessionProvider>
      <Router>
        <UseBioCatchContextPerRoute />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </SessionProvider>
  );
}
