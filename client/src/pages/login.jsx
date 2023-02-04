import React from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { loginUser } from "../api/user";

const styles = {
  paperContainer: {
    backgroundImage: `url(${require("../images/background.JPG")})`,
    height: 800,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const { user, setUser, isLoading, setIsLoading } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userInfo = await loginUser(username, password);

      setUser((prevUser) => ({ ...prevUser, ...userInfo }));
    } catch (e) {
      let message = e?.response.data.message;
      setErrMessage(message);
    }
    setIsLoading(false);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      {isLoading && <Loading />}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        p="0 50px"
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Grid
            item
            xs={6}
            justifyContent="center"
            alignItems="center"
            style={styles.paperContainer}
            display={{ xs: "none", md: "block" }}
          ></Grid>

          <Grid
            item
            xs={12}
            md={6}
            component={Paper}
            elevation={0}
            square
            p={6}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography component="h1" variant="h6">
                Welcome
              </Typography>
              <Typography component="h1" variant="h5" fontWeight="bold">
                Login To Your Account
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleSubmit}
              >
                {errMessage && (
                  <Typography variant="h6" color="darkred">
                    {errMessage}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  id="password"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "rgba(0, 149, 246, 0.7)",
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Login;
