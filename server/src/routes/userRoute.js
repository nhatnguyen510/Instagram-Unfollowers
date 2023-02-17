import { Router } from "express";
import {
  encryptUser,
  decryptUser,
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

userRoute.post("/encrypt", encryptUser);

userRoute.post("/decrypt", decryptUser);

userRoute.get("/unfollowers", findUnfollowers);

userRoute.post("/destroyUnfollowers", unfollowUsers);

export default userRoute;
