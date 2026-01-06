# Глоссарий терминов с семантическим графом

Веб-приложение для отображения глоссария терминов и их визуализации в виде семантического графа.

## Технологии

- **Frontend**: HTML5, CSS3, JavaScript, vis-network
- **Backend**: Node.js, Express, SQLite
- **Контейнеризация**: Docker, Docker Compose
- **Сервер**: Nginx (для фронтенда в Docker)

## Структура проекта

- `/backend` - Node.js сервер с API для терминов
- `/frontend` - Статический фронтенд (HTML, CSS, JavaScript)
- `/frontend/data/terms.json` - Данные терминов в JSON формате
- `docker-compose.yml` - Конфигурация Docker Compose
- `Dockerfile.backend` - Dockerfile для бэкенда
- `Dockerfile.frontend` - Dockerfile для фронтенда

## Возможности

- Просмотр терминов в виде списка (глоссарий)
- Визуализация связей между терминами в виде интерактивного графа
- Переключение между режимами данных (JSON / SQLite БД)
- Контейнеризация с Docker для простого развертывания

## Быстрый старт

### Запуск через Docker Compose

1. Установите [Docker](https://docs.docker.com/get-docker/) и [Docker Compose](https://docs.docker.com/compose/install/)

2. Клонируйте репозиторий:

```bash
git clone <repository-url>
cd glossary-project
```

3. Запустите приложение:

```bash
docker-compose up --build
```

4. Откройте в браузере:
   - Фронтенд: http://localhost:8080
   - Бэкенд API: http://localhost:8000/terms

## Переключение режимов данных

Приложение поддерживает два источника данных:

1. **JSON файл** - читает данные из `frontend/data/terms.json`
2. **SQLite БД** - хранит данные в базе данных SQLite

### Смена режима в Docker

Измените переменную `DATA_SOURCE` в `docker-compose.yml`:

```yaml
environment:
  - DATA_SOURCE=json # или db для БД
```

Перезапустите контейнеры:

```bash
docker-compose down
docker-compose up --build
```

## Работа с данными

### Добавление/редактирование терминов

1. **В режиме JSON**: отредактируйте `frontend/data/terms.json`
2. **В режиме БД**:
   - Для Docker: пересоздайте контейнеры (`docker-compose down && docker-compose up --build`)
   - Для локальной разработки: запустите `npm run init-db` в папке `backend`

### Структура данных

Каждый термин имеет структуру:

```json
{
  "id": 1,
  "term": "Название термина",
  "definition": "Определение термина",
  "source": "URL источника",
  "related": [2, 3, 4] // ID связанных терминов
}
```

## API Endpoints

- `GET /terms` - Получить все термины
- Ответ в формате JSON массива терминов

## Проверка работоспособности

1. **Проверка бэкенда:**

```bash
curl http://localhost:8000/terms
```

2. **Проверка БД (если используется режим db):**

```bash
# Для Docker контейнера
docker exec -it glossary-backend sqlite3 /app/backend/data/terms.db "SELECT COUNT(*) FROM terms;"
```

3. **Проверка фронтенда:**
   - Откройте http://localhost:8080
   - Убедитесь, что переключаются вкладки "Глоссарий терминов" и "Семантический граф"
   - Проверьте, что граф отображает связи между терминами

## Остановка и очистка Docker

```bash
# Остановка контейнеров
docker-compose down

# Полная очистка (включая volumes)
docker-compose down -v

# Удаление образов
docker-compose down --rmi all
```
