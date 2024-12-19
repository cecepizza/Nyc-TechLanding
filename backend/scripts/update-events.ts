import { scrapeEvents } from "./scrape-events";
import fetch from "node-fetch";

async function scrapeAndUpdateEvents() {
  try {
    // First scrape the events
    await scrapeEvents();
    console.log("Events scraped successfully");

    // Then update Google Sheets via the API endpoint
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
  } catch (error) {
    console.error("Error in scrape and update process:", error);
  }
}

scrapeAndUpdateEvents();