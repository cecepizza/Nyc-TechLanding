import { Buffer } from "buffer";

const decodedCredentials = Buffer.from(
  process.env.GOOGLE_CREDENTIALS!,
  "base64"
).toString("utf-8");

export const config = {
  credentials: JSON.parse(decodedCredentials),
};
