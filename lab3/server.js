const express = require("express");

const app = express();

const indexRouter = require("./src/routes/index");
const correctedSurnamesRouter = require("./src/routes/corrected-surnames");


app.use("/", indexRouter);
app.use("/corrected-surnames", correctedSurnamesRouter);

// Запуск сервера на порте 3000
app.listen(3000, () => {
  console.log("Сервер запущен на порте 3000");
});
