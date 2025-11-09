## Запуск происходит внутри локального окружения из папки backend при запущенном сервере:
```bash
# Запуск REST
locust -f locust/locustfile_rest.py --host=http://127.0.0.1:8000

# Запуск headless (пример, 100 пользователей, spawn 10, 1 мин):
locust -f locust/locustfile_rest.py --headless -u 100 -r 10 -t 1m --host=http://127.0.0.1:8000 --csv=rest_test

# Запуск gRPC из корня проекта:
locust -f backend/locust/locustfile_grpc.py
```