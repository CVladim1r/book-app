import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://localhost:27017")

books_data = [
    {
        "title": "Первый среди первых",
        "description": "Description of Book 1",
        "cover": "cover1.jpg"
    },
    {
        "title": "10 лет и уже senior",
        "description": "Description of Book 2",
        "cover": "cover2.jpg"
    }
]

async def main():
    client = AsyncIOMotorClient(MONGO_DETAILS)
    database = client.book_database
    book_collection = database.get_collection("books")

    async def add_books():
        for book_data in books_data:
            result = await book_collection.insert_one(book_data)
            print(f"Inserted book with ID: {result.inserted_id}")

    try:
        await client.server_info()
        print("Successfully connected to MongoDB")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        return
    
    await add_books()

    try:
        books = await book_collection.find().to_list(length=10)
        print(f"Fetched {len(books)} books from MongoDB")
    except Exception as e:
        print(f"Failed to fetch books from MongoDB: {e}")

if __name__ == "__main__":
    asyncio.run(main())
