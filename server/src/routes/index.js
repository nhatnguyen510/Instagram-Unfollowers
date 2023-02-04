import { Router } from "express";
import loginRoute from "./loginRoute.js";
import unfollowersRoute from "./unfollowersRoute.js";
import logoutRoute from "./logoutRoute.js";
import userRoute from "./userRoute.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello!");
});

router.use("/", userRoute);

router.use("/login", loginRoute);

router.use("/logout", logoutRoute);

router.use("/unfollowers", unfollowersRoute);

export default router;
