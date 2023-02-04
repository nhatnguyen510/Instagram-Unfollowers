import { Router } from "express";
import { encryptUser, decryptUser } from "../controllers/userController.js";

const userRoute = Router();

userRoute.post("/encrypt", encryptUser);

userRoute.post("/decrypt", decryptUser);

export default userRoute;
