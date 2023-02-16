import { Typography } from "@mui/material";
import React, { useContext } from "react";
import ResponsiveAppBar from "../components/AppBar";
import { AppContext } from "../context/AppProvider";

const Home = () => {
  const { user } = useContext(AppContext);

  console.log(user);

  const { pk_id, username, profile_pic_url } = user;

  return (
    <>
      {/* <Typography variant="h5">Hello {username} !</Typography>; */}
      <ResponsiveAppBar />
    </>
  );
};

export default Home;
