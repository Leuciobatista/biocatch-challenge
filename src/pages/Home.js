import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import biocatchLogo from "../img/logo.png";
import "../styles.css"; 

export default function Home() {
  return (
    <Container className="home-container">
      <Card className="home-card">
        <CardContent className="home-content">
          {/* Logo BioCatch */}
          <img src={biocatchLogo} alt="BioCatch Logo" className="home-logo" />

          {/* Título */}
          <Typography variant="h4" gutterBottom className="home-title">
            Welcome to the BioCatch Challenge
          </Typography>

          {/* Texto de apresentação */}
          <Typography variant="body1" paragraph className="home-text">
            This application demonstrates how to integrate the <b>BioCatch</b>{" "}
            into a modern web banking experience. The SDK collects user behavior
            patterns (WUPs) in real-time, allowing detection of fraud attempts and
            account takeover activities.
          </Typography>

          <Typography variant="body2" paragraph className="home-subtext">
            Navigate through the app to see the full flow:
            <br />
            <b>Login → Payment → Logout</b>
          </Typography>

          {/* Botão para login */}
          <Button
            variant="contained"
            href="/login"
            size="large"
            className="home-button"
          >
            Start Demo
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
