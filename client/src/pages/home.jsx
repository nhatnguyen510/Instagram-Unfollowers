import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";

const Home = () => {
  const { user } = useContext(AppContext);

  const { pk_id, username, profile_pic_url } = user;

  return <Typography variant="h5">Hello {username} !</Typography>;
};

export default Home;
