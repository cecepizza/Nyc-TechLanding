import type { Request, Response } from "express";
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const LUMA_API_KEY = process.env.LUMA_API_KEY;
const LUMA_BASE_URL = "https://api.lu.ma/v1";

// basic events fetch
router.get("/events", async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${LUMA_BASE_URL}/events`, {
      headers: {
        Authorization: `Bearer ${LUMA_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const events = await response.json();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "failed to fetch events" });
  }
});

export default router;
