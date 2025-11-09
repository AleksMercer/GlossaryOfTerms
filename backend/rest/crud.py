from sqlmodel import Session, select
from ..models import Term
from ..db import engine

def get_terms():
    with Session(engine) as session:
        return session.exec(select(Term)).all()

def get_term(term_id: int):
    with Session(engine) as session:
        return session.get(Term, term_id)

def create_term(term: Term):
    with Session(engine) as session:
        session.add(term)
        session.commit()
        session.refresh(term)
        return term

def update_term(term_id: int, new_data: dict):
    with Session(engine) as session:
        term = session.get(Term, term_id)
        if not term:
            return None
        for key, value in new_data.items():
            setattr(term, key, value)
        session.add(term)
        session.commit()
        session.refresh(term)
        return term

def delete_term(term_id: int):
    with Session(engine) as session:
        term = session.get(Term, term_id)
        if not term:
            return None
        session.delete(term)
        session.commit()
        return term
