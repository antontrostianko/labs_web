const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001;

// Middleware для парсинга тела запроса
app.use(express.urlencoded({ extended: true }));

// Функция для преобразования и сортировки массива фамилий
function transformAndSort(data) {
  return data
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .sort();
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/templates/index.html"));
});

app.post("/submit", (req, res) => {
  const namesArray = req.body.names.split(",").map((name) => name.trim());
  fs.writeFileSync("names.txt", namesArray.join(", "), "utf8");

  const transformedNamesArray = transformAndSort(namesArray);
  fs.writeFileSync(
    "transformed_names.txt",
    transformedNamesArray.join(", "),
    "utf8"
  );

  res.redirect("/result");
});

// Маршрут для отображения второй страницы
app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "src/templates/result.html"));
});

// Маршрут для отображения содержимого первого файла
app.get("/original", (req, res) => {
  const data = fs.readFileSync("names.txt", "utf8");
  res.send(data);
});

// Маршрут для отображения содержимого второго файла
app.get("/transformed", (req, res) => {
  const data = fs.readFileSync("transformed_names.txt", "utf8");
  res.send(data);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
