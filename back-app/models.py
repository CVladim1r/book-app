from pydantic import BaseModel, Field
from typing import Optional

class Book(BaseModel):
    id: str
    title: str
    description: str
    cover_filename: str  # New field to store the cover filename

    @classmethod
    def from_mongo(cls, data):
        return cls(
            id=str(data["_id"]),
            title=data["title"],
            description=data["description"],
            cover_filename=data.get("cover_filename", ""),  # Retrieving cover_filename
        )

class BookCreate(BaseModel):
    title: str
    description: str
