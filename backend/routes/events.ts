import type { Request, Response } from "express";
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// basic events fetch
router.get("/", async (req: Request, res: Response) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.LUMA_API_KEY}`,
      },
    };

    const response = await fetch(
      "https://api.lu.ma/public/v1/calendar/list-events",
      options
    );

    const data = await response.json();
    console.log("Full Luma API Response:", data);

    const events = data.events || data;
    res.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "failed to fetch events" });
  }
});

export default router;
