// components/BookList.tsx
import React, { memo } from 'react';

interface Book {
  id: number;
  title: string;
  description: string;
  cover: string;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = memo(({ books }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map(book => (
        <div key={book.id} className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <img src={book.cover} alt={book.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-black">{book.title}</h2>
            <p className="text-gray-600 text-sm">{book.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

export default BookList;
