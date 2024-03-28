const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const surnames = require("../data/surnames");
// Массив фамилий

// Обработчик GET-запроса для второй страницы
router.get("/", (req, res) => {
  const correctedSurnames = surnames.map(
    (surname) => surname.charAt(0).toUpperCase() + surname.slice(1)
  );
  correctedSurnames.sort(); // Сортировка фамилий в алфавитном порядке

  fs.readFile(
    path.join(__dirname, "..", "templates/corrected-surnames.html"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла corrected-surnames.html:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const correctedSurnamesList = correctedSurnames
        .map((surname) => `<li>${surname}</li>`)
        .join("");
      const html = data.replace(
        "<!-- Фамилии будут заменены на сервере -->",
        correctedSurnamesList
      );
      res.send(html);
    }
  );
});

module.exports = router;
