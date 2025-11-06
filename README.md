# Glossary Web App

Учебный проект включающий в себя выполнение двух заданий:
- Индивидуальное задание "Создание и контейнеризация глоссария терминов ВКР"
- Задание 3 по предмету "Проектирование и развертывание веб-решений в эко-системе Python"

## Компоненты
- **Frontend**: статический сайт (HTML, JS, SCSS)
- **Backend**: FastAPI, SQLModel, SQLite
- **Контейнеризация**: Docker

## Быстрый старт
```bash
# Активация окружения
source venv/Scripts/activate

# Запуск сервера
uvicorn backend.app.main:app --reload
```

## Cтарт c нуля
```bash
# Создание venv (если ещё не создано)
python -m venv venv

# Активация окружения (Git Bash)
source venv/Scripts/activate

# Установить зависимости через requirements.txt
pip install --upgrade pip
pip install -r backend/requirements.txt

# Запустить сервер FastAPI
uvicorn backend.app.main:app --reload
```

## Открыть в браузере:
- API: http://127.0.0.1:8000/terms
- Swagger документация: http://127.0.0.1:8000/docs
- Статический фронтенд: открыть frontend/index.html через браузер

## Cтарт c Docker
```bash
# Собрать образ Docker:
docker build -t glossary-app .

# Запустить контейнер:
docker run -d -p 8000:8000 glossary-app
```
