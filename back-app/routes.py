from fastapi import APIRouter, HTTPException, Query
from models import Book, BookCreate
from database import book_collection
from bson import ObjectId
from typing import List

router = APIRouter()

@router.get("/books", response_model=List[Book])
async def get_books(page: int = 1, limit: int = 10):
    skip = (page - 1) * limit
    books = await book_collection.find().skip(skip).limit(limit).to_list(length=limit)
    return books

@router.post("/books", response_model=Book)
async def create_book(book: BookCreate):
    new_book = await book_collection.insert_one(book.dict())
    created_book = await book_collection.find_one({"_id": new_book.inserted_id})
    return created_book

@router.get("/books/{id}", response_model=Book)
async def get_book(id: str):
    book = await book_collection.find_one({"_id": ObjectId(id)})
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book