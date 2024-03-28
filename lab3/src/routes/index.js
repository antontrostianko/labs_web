const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const surnames = require("../data/surnames");

// Обработчик GET-запроса для главной страницы
router.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "..", "templates/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла index.html:", err);
      res.status(500).send("Ошибка сервера");
      return;
    }
    const surnamesList = surnames
      .map((surname) => `<li>${surname}</li>`)
      .join("");
    const html = data.replace(
      "<!-- Фамилии будут заменены на сервере -->",
      surnamesList
    );
    res.send(html);
  });
});

module.exports = router;
