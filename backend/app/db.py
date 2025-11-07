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
                "definition": "Совокупность технологий и стандартов, обеспечивающих работу клиентских и серверных приложений через браузер и HTTP.",
                "source": "https://developer.mozilla.org/en-US/docs/Web",
                "related": "2"
            },
            {
                "id": 2,
                "term": "Frontend Development",
                "definition": "Область веб-разработки, занимающаяся созданием пользовательского интерфейса и взаимодействия клиента с веб-приложением.",
                "source": "https://developer.mozilla.org/en-US/docs/Learn/Front-end_web_developer",
                "related": "3,4,5"
            },
            {
                "id": 3,
                "term": "JavaScript",
                "definition": "Язык программирования, используемый для создания динамических интерфейсов и логики на стороне клиента.",
                "source": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
                "related": "6,7,8"
            },
            {
                "id": 4,
                "term": "TypeScript",
                "definition": "Надстройка над JavaScript, добавляющая статическую типизацию и инструменты для более безопасной и масштабируемой разработки.",
                "source": "https://www.typescriptlang.org/",
                "related": "6,7,8"
            },
            {
                "id": 5,
                "term": "Web Performance",
                "definition": "Совокупность характеристик, определяющих скорость загрузки, интерактивность и отзывчивость веб-приложения.",
                "source": "https://web.dev/learn/performance/",
                "related": "13,14,15,16,17"
            },
            {
                "id": 6,
                "term": "React",
                "definition": "JavaScript-библиотека для создания пользовательских интерфейсов, основанная на концепции компонент и виртуального DOM.",
                "source": "https://react.dev/",
                "related": "9,10,11,12"
            },
            {
                "id": 7,
                "term": "Vue.js",
                "definition": "Прогрессивный фреймворк для построения интерфейсов, использующий декларативный синтаксис и реактивность данных.",
                "source": "https://vuejs.org/",
                "related": "9,10,11,12"
            },
            {
                "id": 8,
                "term": "Svelte",
                "definition": "Фреймворк, выполняющий сборку интерфейсов на этапе компиляции, устраняя виртуальный DOM и повышая производительность.",
                "source": "https://svelte.dev/",
                "related": "9,11,12"
            },
            {
                "id": 9,
                "term": "Reactivity",
                "definition": "Механизм автоматического обновления пользовательского интерфейса при изменении состояния данных.",
                "source": "https://vuejs.org/guide/extras/reactivity-in-depth.html",
                "related": ""
            },
            {
                "id": 10,
                "term": "Virtual DOM",
                "definition": "Абстрактное представление DOM в памяти, позволяющее минимизировать реальные операции с деревом элементов и ускорить рендеринг.",
                "source": "https://react.dev/learn/render-and-commit",
                "related": ""
            },
            {
                "id": 11,
                "term": "Component-Based Architecture",
                "definition": "Подход к разработке интерфейсов, основанный на разделении UI на независимые переиспользуемые компоненты.",
                "source": "https://react.dev/learn/thinking-in-react",
                "related": ""
            },
            {
                "id": 12,
                "term": "State Management",
                "definition": "Организация хранения и изменения состояния приложения для обеспечения предсказуемого поведения интерфейса.",
                "source": "https://redux.js.org/tutorials/essentials/part-1-overview-concepts",
                "related": ""
            },
            {
                "id": 13,
                "term": "Rendering Optimization",
                "definition": "Техники уменьшения количества и сложности операций рендеринга, включая мемоизацию, lazy-loading и splitting.",
                "source": "https://web.dev/articles/rendering-performance",
                "related": ""
            },
            {
                "id": 14,
                "term": "Bundle Optimization",
                "definition": "Методы уменьшения размера итогового JavaScript-кода: tree shaking, code splitting, минификация.",
                "source": "https://webpack.js.org/guides/tree-shaking/",
                "related": ""
            },
            {
                "id": 15,
                "term": "Performance Metrics",
                "definition": "Ключевые метрики, оценивающие скорость и отзывчивость веб-приложений: LCP, FID, CLS, TTI и др.",
                "source": "https://web.dev/articles/vitals",
                "related": ""
            },
            {
                "id": 16,
                "term": "Performance Testing Tools",
                "definition": "Инструменты для анализа производительности веб-приложений: Lighthouse, WebPageTest, Chrome DevTools, Sentry Performance.",
                "source": "https://developer.chrome.com/docs/lighthouse/overview",
                "related": ""
            },
            {
                "id": 17,
                "term": "Benchmarking",
                "definition": "Процесс сравнения производительности различных технологий и реализаций по единым метрикам и сценариям.",
                "source": "https://en.wikipedia.org/wiki/Benchmark_(computing)",
                "related": ""
            },
            {
                "id": 18,
                "term": "Framework",
                "definition": "Набор инструментов и архитектурных принципов, определяющих структуру приложения и предоставляющих основу для его разработки.",
                "source": "https://developer.mozilla.org/en-US/docs/Glossary/Framework",
                "related": "6,7,8"
            },
            {
                "id": 19,
                "term": "Library",
                "definition": "Набор готовых функций или компонентов, которые можно использовать в коде без навязывания общей архитектуры приложения.",
                "source": "https://developer.mozilla.org/en-US/docs/Glossary/Library",
                "related": "6"
            }
        ]

        for t in terms:
            term = Term(**t)
            session.add(term)
        session.commit()
