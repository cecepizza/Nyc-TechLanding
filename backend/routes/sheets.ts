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

const sheets = google.sheets({ version: "v4", auth });

// test route
router.get("/test", async (req: Request, res: Response) => {
  console.log("Recieved request on /api/sheets/test");
  try {
    let rows;
    // fetch data from exisiting google sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1HRvvJaqWDMi4zJfWoE36Ky5-f7H2Y4vduat2HdSrrxg",
      // fetch data from a specific range in a specific sheet
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

// Jobs Route
router.get("/jobs", async (req: Request, res: Response) => {
  console.log("Recieved request on /api/sheets/jobs");
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1HRvvJaqWDMi4zJfWoE36Ky5-f7H2Y4vduat2HdSrrxg",
      range: "jobs!A1:Z100",
    });
    res.json({ data: response.data.values });
  } catch (error) {
    console.error("Error fetching jobs data:", error);
    res.status(500).json({ error: "failed to fetch jobs data" });
  }
});

// startups route
router.get("/startups", async (req: Request, res: Response) => {
  console.log("Recieved request on /api/sheets/startups");
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1HRvvJaqWDMi4zJfWoE36Ky5-f7H2Y4vduat2HdSrrxg",
      range: "startups!A1:Z100",
    });
    res.json({ data: response.data.values });
  } catch (error) {
    console.error("Error fetching startups data:", error);
    res.status(500).json({ error: "failed to fetch startups data" });
  }
});

// VCs route
router.get("/vcs", async (req: Request, res: Response) => {
  console.log("Received request on /api/sheets/vcs");
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1HRvvJaqWDMi4zJfWoE36Ky5-f7H2Y4vduat2HdSrrxg",
      range: "vcs!A1:Z100",
    });
    res.json({ data: response.data.values });
  } catch (error) {
    console.error("Error fetching vcs data:", error);
    res.status(500).json({ error: "failed to fetch vcs data" });
  }
});

// Accelerators route
router.get("/accelerators", async (req: Request, res: Response) => {
  console.log("Received request on /api/sheets/accelerators");
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1HRvvJaqWDMi4zJfWoE36Ky5-f7H2Y4vduat2HdSrrxg",
      range: "accelerators!A1:Z100",
    });
    res.json({ data: response.data.values });
  } catch (error) {
    console.error("Error fetching accelerators data:", error);
    res.status(500).json({ error: "failed to fetch accelerators data" });
  }
});

export default router;
