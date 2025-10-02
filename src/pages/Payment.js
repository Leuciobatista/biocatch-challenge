import { useState } from "react";
import { useSession } from "../SessionContext";
import { getScore } from "../api";
import { getCdApi } from "../bc";
import Modal from "../components/Modal";


import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import "../styles.css"; 

export default function Payment() {
  const { csid } = useSession();
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  async function handlePayment() {
    if (!csid) {
      setModalMessage("⚠️ No session found. Please login first.");
      return;
    }

    setLoading(true);
    try {
      const cdApi = getCdApi();
      if (cdApi) cdApi.changeContext("payment_screen");

      const res = await getScore(csid, "Leucio Batista");
      if (res.status === 200) {
        setModalMessage("✅ getScore API Response: HTTP 200 OK");
      } else {
        setModalMessage(`⚠️ API Response: HTTP ${res.status}`);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setModalMessage(
        "⚠️ Request sent, but blocked by CORS (expected in localhost). Check Network tab."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="page-container">
      <Card className="page-card">
        <CardContent className="page-content">
          <Typography variant="h4" gutterBottom className="page-title">
            Make a Payment
          </Typography>
          <Typography variant="body2" paragraph className="page-subtext">
            Test the BioCatch SDK by simulating a payment action.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handlePayment}
            disabled={loading}
            className="page-button"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Make Payment"}
          </Button>
        </CardContent>
      </Card>

      <Modal
        title="Payment Result"
        message={modalMessage}
        onClose={() => setModalMessage("")}
      />
    </Container>
  );
}
