// test-credentials.js
require("dotenv").config();
import { google } from "googleapis";
import { config } from "../config";

async function testCredentials() {
  try {
    // Initialize auth
    const auth = new google.auth.GoogleAuth({
      credentials: config.credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Create client
    const sheets = google.sheets({ version: "v4", auth });

    // const spreadsheet = await sheets.spreadsheets.create({
    //   requestBody: {
    //     properties: {
    //       title: "New Spreadsheet",
    //     },
    //   },
    // });

    // // Insert data into the spreadsheet
    // await sheets.spreadsheets.values.update({
    //   spreadsheetId: spreadsheet.data.spreadsheetId!,
    //   range: "Sheet1!A1:B2",
    //   valueInputOption: "RAW",
    //   requestBody: {
    //     values: [
    //       ["Name", "Score"],
    //       ["Test User", "100"],
    //     ],
    //   },
    // });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1HRvvJaqWDMi4zJfWoE36Ky5-f7H2Y4vduat2HdSrrxg",
      range: "jobs",
    });

    console.log("✅ Credentials are working!");
    console.log("Data received:", response.data.values);
  } catch (error) {
    console.log("❌ Error testing credentials:");
    console.log(error.message);

    if (error.message.includes("credentials")) {
      console.log("\nPossible issues:");
      console.log("1. credentials.json file not found");
      console.log("2. credentials.json content is invalid");
      console.log("3. Sheet ID is incorrect");
      console.log("4. Sheet permissions not set correctly");
    }
  }
}

testCredentials();
