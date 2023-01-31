import { Router } from "express";
import { login, loginWithTwoFactors } from "../controllers/userController.js";

const loginRoute = Router();

loginRoute.get("/", (req, res) => {
  res.send("Welcome to login");
});

loginRoute.post("/", login);

loginRoute.post("/two_factor", loginWithTwoFactors);

export default loginRoute;
