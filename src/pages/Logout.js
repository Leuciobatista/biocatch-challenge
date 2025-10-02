import { useEffect, useState } from "react";
import { useSession } from "../SessionContext";
import { getCdApi } from "../bc";

// Material UI
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import "../styles.css";

export default function Logout() {
  const { setCsid } = useSession();
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Limpa a sessão atual
    setCsid(null);

    // Atualiza contexto no BioCatch
    const cdApi = getCdApi();
    if (cdApi) {
      cdApi.changeContext("logout_screen");
      console.log("[BioCatch] changeContext: logout_screen");

      // Opcional: gera novo CSID para próxima sessão
      const newCsid = `session-${Date.now()}`;
      cdApi.setCustomerSessionId(newCsid);
      console.log("[BioCatch] set new CSID after logout:", newCsid);
    }

    setMessage("✅ You have been logged out. Session ended.");
  }, [setCsid]);

  return (
    <Container className="page-container">
      <Card className="page-card">
        <CardContent className="page-content">
          <Typography variant="h4" gutterBottom className="page-title">
            Logout
          </Typography>
          <Typography variant="body1" paragraph>
            {message}
          </Typography>

          <Button
            variant="contained"
            href="/login"
            size="large"
            className="page-button"
          >
            Return to Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
