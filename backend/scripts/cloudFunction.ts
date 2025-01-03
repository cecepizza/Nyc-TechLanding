import { scrapeEvents } from "./scrape-events";
import fetch from "node-fetch";

export const scrapeAndUpdateEvents = async (req, res) => {
  try {
    await scrapeEvents();
    console.log("Events scraped successfully");

    const response = await fetch(
      "http://localhost:8000/api/sheets/events/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Events updated in Google Sheets successfully");
    res.status(200).send("Success");
  } catch (error) {
    console.error("Error in scrape and update process:", error);
    res.status(500).send("Error");
  }
};
