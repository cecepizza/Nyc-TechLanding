import type { Request, Response } from "express";
import express from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      "https://api.lu.ma/public/v1/calendar/list-events",
      {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${process.env.LUMA_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;
