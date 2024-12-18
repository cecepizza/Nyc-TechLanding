import express from "express";
import dotenv from "dotenv";
import sheetsRouter from "./routes/sheets.js";

dotenv.config();

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("wut is up yo");
});

app.use("/api/sheets", sheetsRouter);

app.listen(port, () => {
  console.log(`server is a success on http://localhost:${port}`);
});
