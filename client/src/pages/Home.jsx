import { Container, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import ResponsiveAppBar from "../components/AppBar";
import Footer from "../components/Footer";
import UnfollowerList from "../components/UnfollowerList";
import { AppContext } from "../context/AppProvider";

const Home = () => {
  const {
    user: { username },
  } = useContext(AppContext);

  return (
    <>
      <ResponsiveAppBar />
      <Container
        sx={{
          my: 3,
          minHeight: `calc(100vh - 64px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Typography variant="h6">
            Wellcome <strong>{username}</strong>!
          </Typography>
        </Grid>
        <UnfollowerList />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
