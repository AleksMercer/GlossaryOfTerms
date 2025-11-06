from sqlmodel import SQLModel, Field
class Term(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    term: str
    definition: str
    source: str | None = None
    related: str = Field(default="")
