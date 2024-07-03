// src/components/BookList.tsx
import React from 'react';
import { Book } from '../types';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <ul>
      {books.map(book => (
        <li key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          {book.cover_filename && <img src={`http://localhost:8000/api/covers/${book.cover_filename}`} alt={book.title} />}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
