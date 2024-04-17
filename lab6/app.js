const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const path = require("path");

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/info", async (req, res) => {
  console.log("sdgsdg");
  fs.readFile("./info.json", {}, (err, data) => {
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
