import type { Request, Response } from "express";
import express from "express";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
import credentials from "./credentials.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// confirm router initilization
console.log("initializing gsheets API router");

// initialize the google sheets api
const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// test route
router.get("/test", async (req: Request, res: Response) => {
  console.log("Recieved request on /api/sheets/test");

  let rows;
  try {
    const sheets = google.sheets({ version: "v4", auth });

    // fetch data from exisiting google sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1HRvvJaqWDMi4zJfWoE36Ky5-f7H2Y4vduat2HdSrrxg",
      range: "jobs!2:2",
    });

    rows = response.data.values;
    console.log("data retrieved:", rows);
    res.json({ data: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "failed to fetch data" });
  }
});

export default router;
