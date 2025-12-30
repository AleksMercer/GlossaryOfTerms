const fs = require("fs").promises;
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DATA_SOURCE = process.env.DATA_SOURCE || "json";

const JSON_PATH = path.join(__dirname, "../../frontend/data/terms.json");
const DB_PATH = path.join(__dirname, "../data/terms.db");

let db = null;

async function initializeDatabase() {
  try {
    if (DATA_SOURCE !== "db") return;

    console.log("Инициализация БД...");

    const jsonData = await fs.readFile(JSON_PATH, "utf8");
    const terms = JSON.parse(jsonData);

    db = new sqlite3.Database(DB_PATH);

    await new Promise((resolve, reject) => {
      db.run(
        `
        CREATE TABLE IF NOT EXISTS terms (
          id INTEGER PRIMARY KEY,
          term TEXT NOT NULL,
          definition TEXT NOT NULL,
          source TEXT NOT NULL,
          related TEXT
        )
      `,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    await new Promise((resolve, reject) => {
      db.run("DELETE FROM terms", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const stmt = db.prepare(
      "INSERT INTO terms (id, term, definition, source, related) VALUES (?, ?, ?, ?, ?)"
    );

    for (const term of terms) {
      await new Promise((resolve, reject) => {
        const relatedStr = term.related ? term.related.join(",") : "";
        stmt.run(
          [term.id, term.term, term.definition, term.source, relatedStr],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }

    stmt.finalize();
    console.log(
      `База данных инициализирована. Добавлено ${terms.length} терминов.`
    );
  } catch (error) {
    console.error("Ошибка инициализации БД:", error);
  }
}

async function getTermsFromJson() {
  try {
    const data = await fs.readFile(JSON_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Ошибка чтения JSON:", error);
    return [];
  }
}

async function getTermsFromDb() {
  return new Promise((resolve, reject) => {
    const query = "SELECT id, term, definition, source, related FROM terms";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const terms = rows.map((row) => ({
        ...row,
        related: row.related
          ? row.related
              .split(",")
              .map((id) => parseInt(id))
              .filter((id) => !isNaN(id))
          : [],
      }));
      resolve(terms);
    });
  });
}

async function getTerms() {
  if (DATA_SOURCE === "db") {
    console.log("Чтение данных из БД");
    if (!db) {
      await initializeDatabase();
    }
    return await getTermsFromDb();
  } else {
    console.log("Чтение данных из JSON");
    return await getTermsFromJson();
  }
}

module.exports = {
  getTerms,
  initializeDatabase,
};
