import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSession } from "../SessionContext";
import "../styles.css";

export default function NavBar() {
  const { csid } = useSession();

  return (
    <AppBar position="static" color="default" className="navbar">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Grupo da esquerda */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/" className="nav-button">
            Home
          </Button>
          <Button component={Link} to="/login" className="nav-button">
            Login
          </Button>
          <Button
            component={Link}
            to="/payment"
            className="nav-button"
            disabled={!csid}
          >
            Payment
          </Button>
        </Box>

        {/* Grupo da direita */}
        <Box>
          <Button
            component={Link}
            to="/logout"
            className="nav-button logout-button"
            disabled={!csid}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
