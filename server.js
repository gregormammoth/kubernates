const express = require("express");
const app = express();

const PORT = process.env.APP_PORT || 3000;
const MESSAGE = process.env.APP_MESSAGE || "Hello, default!";
const SECRET = process.env.APP_SECRET || "no_secret";

app.get("/", (req, res) => {
  res.send(`${MESSAGE} (secret: ${SECRET})`);
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});