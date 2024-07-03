from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from models import Book, BookCreate
from database import book_collection
from bson import ObjectId
import shutil
import os
from typing import List
from pydantic import BaseModel
from fastapi.responses import FileResponse

router = APIRouter()

UPLOAD_FOLDER = "./img"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

class BookCreate(BaseModel):
    title: str
    description: str

@router.get("/books", response_model=List[Book])
async def get_books(page: int = 1, limit: int = 10):
    skip = (page - 1) * limit
    books = await book_collection.find().skip(skip).limit(limit).to_list(length=limit)
    return [Book.from_mongo(book) for book in books]

@router.post("/books", response_model=Book)
async def create_book(title: str = Form(...), description: str = Form(...), cover: UploadFile = File(...)):
    try:
        cover_path = os.path.join(UPLOAD_FOLDER, cover.filename)
        with open(cover_path, "wb") as cover_file:
            shutil.copyfileobj(cover.file, cover_file)

        new_book_data = {"title": title, "description": description, "cover_filename": cover.filename}
        new_book = await book_collection.insert_one(new_book_data)
        created_book = await book_collection.find_one({"_id": new_book.inserted_id})

        cover_url = f"http://localhost:8000/api/covers/{cover.filename}"

        return Book.from_mongo({**created_book, "cover_filename": cover.filename, "cover_url": cover_url})

    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

@router.get("/books/{id}", response_model=Book)
async def get_book(id: str):
    book = await book_collection.find_one({"_id": ObjectId(id)})
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return Book.from_mongo(book)

@router.get("/covers/{filename}")
async def get_book_cover(filename: str):
    cover_path = os.path.join(UPLOAD_FOLDER, filename)
    return FileResponse(cover_path)
