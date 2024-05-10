import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Warning } from "../components/Alerts";
import { useState } from "react";
import { Loader } from "../main";
import { useRecoilValue } from "recoil";
import { isBackendUpAtom } from "../atoms";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [isWarningAlertOpen, setIsWarningAlertOpen] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isBackendUp = useRecoilValue(isBackendUpAtom);
  React.useEffect(() => {
    const userID = window.localStorage.getItem("userID-dobby");
    if (userID) {
      alert("User Already Logged In");
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };
    setIsLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/login`,
      {
        data: payload,
      }
    );
    setIsLoading(false);
    const isSuccess = res.data.success;
    const message = res.data.message;
    if (isSuccess) {
      const userID = res.data.id;
      window.localStorage.setItem("userID-dobby", userID);
      navigate("/home");
    } else {
      setError({ title: "Error", description: message });
      setIsWarningAlertOpen(true);
    }
  };
  if (isLoading) {
    return (
      <>
        <Loader />
        {!isBackendUp && (
          <p
            style={{
              position: "absolute",
              top: "2%",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              color: "gray",
              left: "38%",
              fontSize: "20px",
            }}
          >
            Backend hasn't started yet. Please wait.
          </p>
        )}
      </>
    );
  }
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "0",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Warning
          title={error.title}
          description={error.description}
          isOpen={isWarningAlertOpen}
          closeAlert={() => {
            setIsWarningAlertOpen(false);
          }}
        />
      </div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main", zIndex: "-1" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
