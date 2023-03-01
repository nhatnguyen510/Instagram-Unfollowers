import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./routes/index.js";
import cors from "cors";
import helmet from "helmet";

const app = express();

const PORT = process.env.API_PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log("App listened at http://localhost:5000");
});
