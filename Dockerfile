# ========================
# БАЗОВЫЙ ОБРАЗ
# ========================
FROM python:3.11-slim

# Не кешируем питон-вывод
ENV PYTHONUNBUFFERED=1

# Рабочая директория
WORKDIR /app

# ========================
# УСТАНОВКА ЗАВИСИМОСТЕЙ
# ========================
COPY ./backend/requirements.txt ./requirements.txt
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir locust grpcio grpcio-tools \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# ========================
# КОПИРОВАНИЕ ПРОЕКТА
# ========================
COPY ./backend ./backend
COPY ./frontend ./frontend
COPY ./database.db ./database.db

# ========================
# НАСТРОЙКИ ПОРТОВ
# ========================
# 8000 - REST API (FastAPI)
# 50051 - gRPC сервер
# 8089 - Locust Web UI
EXPOSE 8000 50051 8089

# ========================
# ВЫБОР РЕЖИМА ЗАПУСКА
# ========================
# Возможные варианты при запуске контейнера:
#   docker run ... rest     → FastAPI сервер
#   docker run ... grpc     → gRPC сервер
#   docker run ... load     → Locust тестирование

CMD ["bash", "-c", "\
    if [ \"$1\" = 'rest' ]; then \
        uvicorn backend.rest.main:app --host 0.0.0.0 --port 8000; \
    elif [ \"$1\" = 'grpc' ]; then \
        python -m backend.grpc.server; \
    elif [ \"$1\" = 'load' ]; then \
        locust -f backend/tests/locustfile.py --host http://localhost:8000; \
    else \
        echo 'Укажите режим: rest | grpc | load'; \
        exit 1; \
    fi \
", "--"]
