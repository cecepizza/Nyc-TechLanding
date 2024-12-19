// backend/scripts/scrape-events.ts
import { chromium } from "playwright";

function cleanDate(dateStr: string): string {
  // Remove day of week and clean up the date
  return dateStr
    .replace(/Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/g, "")
    .replace(
      "Today",
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    )
    .trim();
}

async function scrapeEvents() {
  console.log("Starting scrape");
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("https://lu.ma/nyc-tech");
    console.log("events page loaded");

    await page.waitForSelector(".timeline", { timeout: 60000 });
    console.log("Timeline found");

    const events = await page.evaluate(() => {
      const eventCards = Array.from(
        document.querySelectorAll('[class*="timeline-section"]')
      );

      return eventCards
        .map((card) => {
          // Get event title
          const titleElem = card.querySelector('h3, [class*="event-title"]');

          // Find any event link (lu.ma or partiful)
          const linkElem = card.querySelector(
            "a.event-link, a.content-link"
          ) as HTMLAnchorElement | null;

          // Get image
          const imgElem = card.querySelector("img") as HTMLImageElement | null;

          // Get date
          let dateText = "";
          let currentElem = card;
          while (currentElem && !dateText) {
            const dateElem = currentElem.querySelector('[class*="date-title"]');
            if (dateElem) {
              dateText = dateElem.textContent?.trim() || "";
            }
            currentElem = currentElem.previousElementSibling as HTMLElement;
          }

          // Get time
          const timeElem = card.querySelector(".event-time");
          const timeText = timeElem?.textContent?.trim();

          // Get location - look for Fractal Tech specifically
          const locationElems = card.querySelectorAll(
            '[class*="attribute"] .text-ellipses'
          );
          let locationText = "Fractal Tech"; // Default location
          locationElems.forEach((elem) => {
            const text = elem.textContent?.trim();
            if (text?.includes("Fractal Tech")) {
              locationText = text;
            }
          });

          // Get organizer info
          const organizerElem = card.querySelector(
            '[class*="attribute"] .text-ellipses'
          );
          const organizerText = organizerElem?.textContent?.trim();

          return {
            name: titleElem?.textContent?.trim(),
            url: linkElem?.href || null,
            cover_image_url: imgElem?.src || null,
            date: dateText,
            time: timeText,
            location: locationText,
            organizer: organizerText,
            event_type: "meetup",
            last_updated: new Date().toISOString(),
          };
        })
        .filter((event) => {
          return (
            event.name &&
            !event.name.includes("Today") &&
            !event.name.endsWith("day")
          );
        });
    });

    // Clean up the dates without async/await
    const cleanedEvents = events.map((event) => ({
      ...event,
      date: cleanDate(event.date),
    }));

    console.log(`Found ${cleanedEvents.length} events`);
    cleanedEvents.forEach((event, index) => {
      console.log(`\nEvent ${index + 1}:`);
      console.log(JSON.stringify(event, null, 2));
    });

    // Save to file
    const fs = require("fs");
    fs.writeFileSync(
      "scraped-events.json",
      JSON.stringify(cleanedEvents, null, 2)
    );
    console.log("\nEvents saved to scraped-events.json");
  } catch (error) {
    console.error("Error scraping events:", error);
  } finally {
    await browser.close();
  }
}

scrapeEvents();
