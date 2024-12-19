import type { Request, Response } from "express";
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// basic events fetch
router.get("/", async (req: Request, res: Response) => {
  console.log("Hit events endpoint");
  console.log("backend: recieved request for /events");
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.LUMA_API_KEY}`,
      },
    };
    console.log("backend: making request to luma api");

    const response = await fetch(
      "https://api.lu.ma/public/v1/calendar/list-events",
      options
    );
    console.log("backend: luma API response status:", response.status);
    const data = await response.json();
    console.log("backend: parsed response:", data);

    const events = data.events || data;
    console.log("backend: sending response:", events);
    res.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "failed to fetch events" });
  }
});

export default router;
