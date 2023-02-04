import { Router } from "express";
import userRoute from "./userRoute.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello!");
});

router.use("/", userRoute);

export default router;
