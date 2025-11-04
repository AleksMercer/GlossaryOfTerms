# Glossary Web App

Учебный проект: веб-приложение глоссария терминов.

## Компоненты
- **Frontend**: статический сайт (HTML, JS, SCSS)
- **Backend**: FastAPI + SQLModel + SQLite
- **Контейнеризация**: Docker (на финальном этапе)

## Быстрый старт (локально)
```bash
# Активация окружения
source venv/Scripts/activate

# Запуск сервера
uvicorn backend.app.main:app --reload
