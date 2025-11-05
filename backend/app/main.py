from fastapi import FastAPI, HTTPException
from .models import Term
from .db import init_db
from . import crud
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(title="Glossary API", lifespan=lifespan)

# разрешаем запросы с фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# получить все термины
@app.get("/terms", response_model=list[Term])
def read_terms():
    return crud.get_terms()

# получить конкретный термин
@app.get("/terms/{term_id}", response_model=Term)
def read_term(term_id: int):
    term = crud.get_term(term_id)
    if not term:
        raise HTTPException(status_code=404, detail="Term not found")
    return term

# добавить термин
@app.post("/terms", response_model=Term)
def create_term(term: Term):
    return crud.create_term(term)

# обновить термин
@app.put("/terms/{term_id}", response_model=Term)
def update_term(term_id: int, term: Term):
    updated = crud.update_term(term_id, term.model_dump(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Term not found")
    return updated

# удалить термин
@app.delete("/terms/{term_id}", response_model=Term)
def delete_term(term_id: int):
    deleted = crud.delete_term(term_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Term not found")
    return deleted
