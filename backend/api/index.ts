import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import type { Request, Response, ErrorRequestHandler } from "express";
import eventsRouter from "../routes/events.ts";
import sheetsRouter from "../routes/sheets.ts";

dotenv.config();

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.send("wut is up yo");
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/sheets", sheetsRouter);
app.use("/api/events", eventsRouter);
console.log(
  "Registered routes:",
  app._router.stack.map((r: any) => r.route?.path).filter(Boolean)
);

// Add error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is a success on http://localhost:${port}`);
});

module.exports = app;
