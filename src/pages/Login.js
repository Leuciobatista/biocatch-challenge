import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../SessionContext";
import { getCdApi } from "../bc";
import { initSession } from "../api";
import Modal from "../components/Modal";

// Material UI
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

export default function Login() {
  const { csid, setCsid } = useSession();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null); // { message, success }
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);
    try {
      const newCsid = csid || `session-${Date.now()}`;
      setCsid(newCsid);

      const cdApi = getCdApi();
      if (cdApi) {
        cdApi.setCustomerSessionId(newCsid);
        cdApi.changeContext("login_screen");
        console.log("[BioCatch] setCustomerSessionId + changeContext:", newCsid);
      }

      try {
        const res = await initSession(newCsid, "Leucio Batista");
        console.log("Init API status:", res.status);

        setModalData({
          message:
            "✅ Init API request sent (CORS block in localhost, 200 expected in production).",
          success: true,
        });
      } catch (err) {
        console.error("Login error (CORS esperado):", err);
        setModalData({
          message:
            "⚠️ Init request sent, but blocked by CORS (expected in localhost).",
          success: true, // força sucesso para continuar fluxo
        });
      }
    } finally {
      setLoading(false);
    }
  }

  function handleCloseModal() {
    if (modalData?.success) {
      navigate("/payment");
    }
    setModalData(null);
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card sx={{ width: 400, boxShadow: 4, borderRadius: 3 }}>
        <CardContent className="text-center">
          <Typography variant="h4" gutterBottom>
            Secure Login
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Please log in to continue to your account.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleLogin}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </CardContent>
      </Card>

      <Modal
        title="Login Result"
        message={modalData?.message}
        onClose={handleCloseModal}
      />
    </Container>
  );
}
