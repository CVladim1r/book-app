from pydantic import BaseModel, Field
from typing import Optional

class Book(BaseModel):
    id: Optional[str]
    title: str
    description: str
    cover: str

class BookCreate(BaseModel):
    title: str
    description: str
    cover: str