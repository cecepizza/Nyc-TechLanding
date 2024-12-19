// require("dotenv").config();

// const fetch = require("node-fetch");

// async function testLumaCredentials() {
//   try {
//     const response = await fetch("https://api.lumen.ai/v1/events", {
//       headers: {
//         Authorization: `Bearer ${process.env.LUMEN_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();
//     console.log("✅ Luma API connection successful!");
//     console.log("Events found:", data);
//   } catch (error) {
//     console.log("❌ Error testing Luma API:");
//     if (error instanceof Error) {
//       console.log(error.message);
//     }
//   }
// }

// test-luma.ts
import "dotenv/config";
import fetch from "node-fetch";

interface LumaResponse {
  error?: string;
  // add other expected properties
}

const lumaApiKey = process.env.LUMA_API_KEY;
console.log("Luma API Key:", lumaApiKey);

async function testLumaConnection() {
  try {
    // Test with the correct API endpoint
    const eventsResponse = await fetch(
      "https://api.lu.ma/public/v1/calendar/list-events",
      {
        headers: {
          Authorization: `Bearer ${lumaApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await eventsResponse.json()) as LumaResponse;
    console.log("API Response:", data);

    // If we get an error, log more details
    if (data.error) {
      console.log("Error details:", data.error);
    }
  } catch (error) {
    console.log("Error details:", error);
  }
}

testLumaConnection();

testLumaConnection();
