import { Router } from "express";
import {
  login,
  loginWithTwoFactors,
  logout,
  findUnfollowers,
  unfollowUsers,
} from "../controllers/userController.js";

const userRoute = Router();

userRoute.post("/login", login);

userRoute.post("/two_factor_login", loginWithTwoFactors);

userRoute.post("/logout", logout);

userRoute.get("/unfollowers", findUnfollowers);

userRoute.post("/destroyUnfollowers", unfollowUsers);

export default userRoute;
