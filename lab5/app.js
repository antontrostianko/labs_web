const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const app = express();
const PORT = 3000;
const path = require("path");

console.log(process.env)

const {

  USER,
  PASSWORD

} = process.env

const uri =
  `mongodb+srv://${USER}:${PASSWORD}@employees.tkwnn7q.mongodb.net/?retryWrites=true&w=majority&ssl=true&appName=employees`;
// Middleware для обработки JSON в запросах
app.use(express.json());

// Создайте клиент MongoDB
const client = new MongoClient(uri);

// Подключение к MongoDB и запуск сервера
async function startServer() {
  try {
    // Подключение к MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "index.html"));
    });

    // Обработчик для получения всех сотрудников
    app.get("/api/employees", async (req, res) => {
      try {
        // Получаем всех сотрудников из базы данных
        const employees = await client
          .db()
          .collection("employees")
          .find()
          .toArray();
        res.json(employees); // Отправляем список сотрудников в формате JSON
      } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).send("Server error");
      }
    });

    app.get("/api/employees/:method/:val", async (req, res) => {
      try {
        const method = req.params.method;
        const val = +req.params.val;
        const params = {
          [method]: val,
        };
        // Получаем всех сотрудников из базы данных
        const employees = await client
          .db()
          .collection("employees")
          .find({
            salary: params,
            //  {
            //   $lte: 80,
            // },
          })
          .toArray();
        res.json(employees); // Отправляем список сотрудников в формате JSON
      } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).send("Server error");
      }
    });

    // Обработчик для создания нового сотрудника
    app.post("/api/employees", async (req, res) => {
      try {
        const newEmployee = req.body;
        const result = await client
          .db()
          .collection("employees")
          .insertOne(newEmployee);
        console.log(result.ops);
        //res.status(201).json(result.ops[0]); // Возвращаем созданный документ с ID
      } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).send("Server error");
      }
    });

    // Обработчик для обновления существующего сотрудника по IDN
    app.put("/api/employees/:idn", async (req, res) => {
      try {
        const idn = req.params.idn;
        const newData = req.body;
        const result = await client
          .db()
          .collection("employees")
          .updateOne({ idn: idn }, { $set: newData });
        res.json({ message: `${result.modifiedCount} document(s) updated` });
      } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).send("Server error");
      }
    });

    // Обработчик для удаления существующего сотрудника по IDN
    app.delete("/api/employees/:idn", async (req, res) => {
      try {
        const idn = req.params.idn;
        const result = await client
          .db()
          .collection("employees")
          .deleteOne({ idn: idn });
        res.json({ message: `${result.deletedCount} document(s) deleted` });
      } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).send("Server error");
      }
    });

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
