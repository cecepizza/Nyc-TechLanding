import type { Request, Response } from "express";
import express from "express";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { config } from "../config.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// confirm router initilization
console.log("initializing gsheets API router");

// initialize the google sheets api
const auth = new google.auth.GoogleAuth({
  credentials: config.credentials,
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
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
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
  const sheetId = (req.query.id as string) || process.env.STARTUPS_SHEET_ID;
  console.log("Recieved request on /api/sheets/startups");
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
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
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
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
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "accelerators!A1:Z100",
    });
    res.json({ data: response.data.values });
  } catch (error) {
    console.error("Error fetching accelerators data:", error);
    res.status(500).json({ error: "failed to fetch accelerators data" });
  }
});

// Add this new route for updating events
router.post("/events/update", async (req: Request, res: Response) => {
  try {
    // Read the scraped events from the JSON file
    const scrapedEventsPath = path.join(
      __dirname,
      "../scripts/scraped-events.json"
    );
    const eventsData = JSON.parse(fs.readFileSync(scrapedEventsPath, "utf-8"));

    // Format the events for Google Sheets
    const values = eventsData.map((event: any) => [
      event.name,
      event.date,
      event.time,
      event.organizer,
      event.location,
      event.url,
      event.cover_image_url,
      event.event_type,
      event.last_updated,
    ]);

    // Clear existing content
    await sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "events!A2:I100",
    });

    // Update with new values
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "events!A2",
      valueInputOption: "RAW",
      requestBody: {
        values: values,
      },
    });

    res.json({ success: true, message: "Events updated successfully" });
  } catch (error) {
    console.error("Error updating events:", error);
    res.status(500).json({ error: "Failed to update events" });
  }
});

// Add events route
router.get("/events", async (req: Request, res: Response) => {
  console.log("Received request on /api/sheets/events");
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "events!A1:Z100", // Make sure you have a sheet named "events"
    });
    console.log("Events data retrieved:", response.data.values);
    res.json({ data: response.data.values });
  } catch (error) {
    console.error("Error fetching events data:", error);
    res.status(500).json({ error: "failed to fetch events data" });
  }
});

export default router;
