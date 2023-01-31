import { Router } from "express";
import { findUnfollowers } from "../controllers/userController.js";

const unfollowersRoute = Router();

unfollowersRoute.get("/", findUnfollowers);

export default unfollowersRoute;
