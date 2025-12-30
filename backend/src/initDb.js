const fs = require("fs").promises;
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const JSON_PATH = path.join(__dirname, "../../frontend/data/terms.json");
const DB_PATH = path.join(__dirname, "../data/terms.db");
const DB_DIR = path.dirname(DB_PATH);

async function initializeDatabase() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });

    const jsonData = await fs.readFile(JSON_PATH, "utf8");
    const terms = JSON.parse(jsonData);

    const db = new sqlite3.Database(DB_PATH);

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
    db.close();

    console.log(
      `База данных инициализирована. Добавлено ${terms.length} терминов.`
    );
  } catch (error) {
    console.error("Ошибка инициализации БД:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
