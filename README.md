# Book App Project
This project is a full-stack application for managing books, with a front-end built using React and Next.js and a back-end built using FastAPI. Below are the steps to set up and run the project.

## Prerequisites
Ensure you have the following installed:

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB

## Setting Up the Project
Clone the Repository

sh
shell
```
git clone https://github.com/yourusername/book-app.git
cd book-app
```

## Front-end Setup
npm
```
cd front-app
npm install
npm build / npm run dev
```

## Back-end Setup
```
cd ../back-app
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

you also need to restore databases on MongoDB
Good Luck :)