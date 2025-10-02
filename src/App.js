
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
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
      "/overview": "account_overview",
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
          <Route path="/overview" element={<Overview />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </SessionProvider>
  );
}
