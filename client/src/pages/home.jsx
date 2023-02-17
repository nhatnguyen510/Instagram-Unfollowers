import { Box, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import ResponsiveAppBar from "../components/AppBar";
import UnfollowerList from "../components/UnfollowerList";
import { AppContext } from "../context/AppProvider";

const Home = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Container
        sx={{
          my: 3,
          minHeight: `calc(100vh - 64px)`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <UnfollowerList />
      </Container>
    </>
  );
};

export default Home;
