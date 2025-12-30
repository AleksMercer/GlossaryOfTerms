const express = require("express");
const cors = require("cors");
const dataHandler = require("./database");

const app = express();
app.use(cors());
const port = process.env.PORT || 8000;

if (process.env.DATA_SOURCE === "db") {
  dataHandler
    .initializeDatabase()
    .then(() => console.log("БД готова к работе"))
    .catch((err) => console.error("Ошибка инициализации БД:", err));
}

app.get("/terms", async (req, res) => {
  try {
    const terms = await dataHandler.getTerms();
    res.json(terms);
  } catch (error) {
    console.error("Ошибка при получении терминов:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
  console.log(`Режим данных: ${process.env.DATA_SOURCE || "json"}`);
});
