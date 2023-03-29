import React, { useContext, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Container, Grid, Typography, Avatar, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AppContext } from "../context/AppProvider";
import { loginWithTwoFactors } from "../api/user";
import { useNavigate } from "react-router-dom";

const TwoFactor = () => {
  const [OTP, setOTP] = useState("");

  const { twoFactorUser, setUser, isLoggedIn, isLoading, setIsLoading } =
    useContext(AppContext);

  const navigate = useNavigate();

  const matchIsNumeric = (text) => {
    return text.match(/[0-9]/);
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };

  const handleChange = (OTP) => {
    setOTP(OTP);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const { username, two_factor_identifier, verificationMethod } =
      twoFactorUser.current;

    try {
      const {
        data: { logged_in_user },
      } = await loginWithTwoFactors({
        username,
        two_factor_identifier,
        verificationMethod,
        verificationCode: OTP,
      });

      setUser(logged_in_user);
      isLoggedIn.current = true;
      twoFactorUser.current = null;
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: "10px",
            padding: "2rem",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
          spacing={3}
        >
          <Grid item container>
            <Grid
              item
              container
              alignItems="center"
              direction="column"
              spacing={2}
            >
              <Grid item>
                <Avatar>
                  <LockOutlinedIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography component="h1" variant="h5">
                  Verification Code
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign="center" marginBottom={2}>
            <Paper elevation={0}>
              <Typography variant="h6">
                Please enter the verification code sent to your mobile
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item container spacing={3} justify="center">
              <MuiOtpInput
                value={OTP}
                length={6}
                gap={2}
                onChange={handleChange}
                validateChar={validateChar}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                loading={isLoading}
              >
                Verify
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TwoFactor;
