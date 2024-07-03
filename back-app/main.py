from fastapi import FastAPI
from routes import router

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Book API"}

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)