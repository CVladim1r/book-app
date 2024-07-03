from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from routes import router
from models import BookCreate, Book
from database import book_collection
from bson import ObjectId
import shutil
import os

UPLOAD_FOLDER = "./img"

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://example.com",
    "https://www.example.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

@app.get("/")
def read_root():
    return {"message": "Book API! U now? ;)"}

app.include_router(router, prefix="/api")

app.mount("/img", StaticFiles(directory=UPLOAD_FOLDER), name="img")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)