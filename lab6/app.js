const express = require("express");

const fs = require("fs").promises;

const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.json());

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/new_page", async (req, res) => {
  res.sendFile(path.join(__dirname, "new_page.html"));
});


app.get("/info", async (req, res) => {
  try {
    // Чтение содержимого файла info.json
    const data = await fs.readFile("info.json", "utf8");
    const info = JSON.parse(data);

    // Отправка содержимого файла в ответе
    res.json(info);
  } catch (err) {
    console.error("Error reading info.json:", err); // Вывод ошибки в консоль
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
