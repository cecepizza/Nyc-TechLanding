import type { Request, Response } from "express";
import express from "express";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
import credentials from "./credentials.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

//initialize the google sheets api
const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// test route
router.get("/test", async (req: Request, res: Response) => {
  let rows;
  try {
    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: "New Spreadsheet",
        },
      },
    });

    // Insert data into the spreadsheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheet.data.spreadsheetId!,
      range: "Sheet1!A1:B2",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          ["Name", "Score"],
          ["Test User", "100"],
        ],
      },
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheet.data.spreadsheetId!,
      range: "Sheet1",
    });
    rows = response.data.values;
    res.json({ data: rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "failed to fetch data" });
  }
});

export default router;
