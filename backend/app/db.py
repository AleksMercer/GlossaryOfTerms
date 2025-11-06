from sqlmodel import SQLModel, create_engine, Session,select
from sqlalchemy import func
from .models import Term

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)

def init_db():
    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        existing_count = session.exec(select(func.count()).select_from(Term)).one()
        if existing_count > 0:
            return

        terms = [
            {
                "id": 1,
                "term": "Web",
                "definition": "Система взаимосвязанных документов и приложений, доступных через Интернет.",
                "source": "https://en.wikipedia.org/wiki/World_Wide_Web",
                "related": "2,3,4"
            },
            {
                "id": 2,
                "term": "Frontend",
                "definition": "Клиентская часть веб-приложения, с которой взаимодействует пользователь.",
                "source": "https://en.wikipedia.org/wiki/Front-end_web_development",
                "related": "1,5,6,7,8"
            },
            {
                "id": 3,
                "term": "Backend",
                "definition": "Серверная часть приложения, обрабатывающая данные и управляющая логикой.",
                "source": "https://en.wikipedia.org/wiki/Front_and_back_ends",
                "related": "1,9,10,11"
            },
            {
                "id": 4,
                "term": "Performance",
                "definition": "Производительность веб-приложений и методов её оптимизации.",
                "source": "https://developer.mozilla.org/en-US/docs/Learn/Performance",
                "related": "1,12,13,14"
            },
            {
                "id": 5,
                "term": "HTML",
                "definition": "Язык гипертекстовой разметки, определяющий структуру веб-страниц.",
                "source": "https://developer.mozilla.org/en-US/docs/Web/HTML",
                "related": "2,6"
            },
            {
                "id": 6,
                "term": "CSS",
                "definition": "Язык таблиц стилей, описывающий внешний вид документов HTML.",
                "source": "https://developer.mozilla.org/en-US/docs/Web/CSS",
                "related": "2,5,7"
            },
            {
                "id": 7,
                "term": "JavaScript",
                "definition": "Язык программирования, добавляющий интерактивность веб-страницам.",
                "source": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
                "related": "2,6,8,9"
            },
            {
                "id": 8,
                "term": "Frameworks",
                "definition": "Готовые инструменты и библиотеки для ускорения разработки.",
                "source": "https://en.wikipedia.org/wiki/Software_framework",
                "related": "2,7,15,16"
            },
            {
                "id": 9,
                "term": "API",
                "definition": "Интерфейс взаимодействия между программными компонентами.",
                "source": "https://en.wikipedia.org/wiki/API",
                "related": "3,7,10,11,17"
            },
            {
                "id": 10,
                "term": "Database",
                "definition": "Организованное хранилище данных, используемое в веб-приложениях.",
                "source": "https://en.wikipedia.org/wiki/Database",
                "related": "3,9,11"
            },
            {
                "id": 11,
                "term": "FastAPI",
                "definition": "Современный фреймворк на Python для создания быстрых API.",
                "source": "https://fastapi.tiangolo.com/",
                "related": "3,9,10,17"
            },
            {
                "id": 12,
                "term": "Caching",
                "definition": "Метод ускорения загрузки путем временного хранения данных.",
                "source": "https://en.wikipedia.org/wiki/Web_cache",
                "related": "4,13"
            },
            {
                "id": 13,
                "term": "Minification",
                "definition": "Процесс уменьшения размера файлов путем удаления лишнего кода.",
                "source": "https://en.wikipedia.org/wiki/Minification_(programming)",
                "related": "4,12,14"
            },
            {
                "id": 14,
                "term": "Lazy Loading",
                "definition": "Техника загрузки ресурсов только по мере необходимости.",
                "source": "https://en.wikipedia.org/wiki/Lazy_loading",
                "related": "4,13"
            },
            {
                "id": 15,
                "term": "React",
                "definition": "JavaScript-библиотека для создания пользовательских интерфейсов.",
                "source": "https://react.dev/",
                "related": "8"
            },
            {
                "id": 16,
                "term": "Vue",
                "definition": "Прогрессивный JavaScript-фреймворк для построения интерфейсов.",
                "source": "https://vuejs.org/",
                "related": "8"
            },
            {
                "id": 17,
                "term": "JSON",
                "definition": "Формат обмена данными между клиентом и сервером.",
                "source": "https://www.json.org/",
                "related": "9,11,18"
            },
            {
                "id": 18,
                "term": "REST",
                "definition": "Архитектурный стиль взаимодействия компонентов через HTTP.",
                "source": "https://en.wikipedia.org/wiki/Representational_state_transfer",
                "related": "17,9,11,19,20"
            },
            {
                "id": 19,
                "term": "Docker",
                "definition": "Платформа контейнеризации приложений для их изоляции и переноса.",
                "source": "https://www.docker.com/",
                "related": "20"
            },
            {
                "id": 20,
                "term": "Deployment",
                "definition": "Процесс развёртывания веб-приложений на серверах.",
                "source": "https://en.wikipedia.org/wiki/Software_deployment",
                "related": "4"
            }
        ]

        for t in terms:
            term = Term(**t)
            session.add(term)
        session.commit()
