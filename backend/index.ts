import express from "express";

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("wut is up yo");
});
app.listen(port, () => {
  console.log(`server is a success on http://localhost:${port}`);
});
