# Glossary Web App

Учебный проект включающий в себя выполнение двух заданий:
- Индивидуальное задание "Создание и контейнеризация глоссария терминов ВКР"
- Задание 3 по предмету "Проектирование и развертывание веб-решений в эко-системе Python"
- Python version 3.11.9

## Компоненты
- **Frontend**: статический сайт (HTML, JS, SCSS)
- **Backend**: FastAPI, SQLModel, SQLite
- **Контейнеризация**: Docker

## Начало работы с проектом:
```bash
# Создание venv (если ещё не создано)
python -m venv venv

# Активация окружения (Git Bash)
source venv/Scripts/activate

# Установить зависимости через requirements.txt
pip install --upgrade pip
pip install -r backend/requirements.txt

# Запуск сервера REST
uvicorn backend.rest.main:app --reload

# Запуск сервера gRPC
python -m backend.grpc.server

# Запуск клиента gRPC
python -m backend.grpc.client
```

## Открыть в браузере REST:
- API: http://127.0.0.1:8000/terms
- Swagger документация: http://127.0.0.1:8000/docs
- Статический фронтенд: открыть frontend/index.html через браузер

## Cтарт c Docker:
```bash
# Собрать образ Docker:
docker build -t glossary-app .

# Запустить контейнер:
docker run -d -p 8000:8000 glossary-app
```

## Сохранение зависимостей:
```bash
pip freeze > backend/requirements.txt
```