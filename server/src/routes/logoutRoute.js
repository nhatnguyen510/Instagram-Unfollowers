import { Router } from "express";
import { logout } from "../controllers/userController.js";

const logoutRoute = Router();

logoutRoute.post("/", logout);

export default logoutRoute;
