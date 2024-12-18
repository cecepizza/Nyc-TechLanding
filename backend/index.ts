import express from "express";
import dotenv from "dotenv";
import sheetsRouter from "./routes/sheets";
import cors from "cors";
import type { Request, Response, ErrorRequestHandler } from "express";

dotenv.config();

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.send("wut is up yo");
});

app.use("/api/sheets", sheetsRouter);

// Add error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is a success on http://localhost:${port}`);
});
