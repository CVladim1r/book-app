'use client';

import { useState, useEffect, useCallback } from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { useRouter } from 'next/navigation';
import { getBooks, createBook } from '../api';

const IndexPage = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const booksPerPage = 5;

  const fetchBooks = async (page: number) => {
    const data = await getBooks(page, booksPerPage);
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  const handleCreate = useCallback(async (book: { title: string; description: string; cover: string }) => {
    await createBook(book);
    fetchBooks(page);
    setShowForm(false);
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600">Список Книг</h1>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        >
          Добавить книгу
        </button>
      </div>
      <BookList books={books} />
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Назад
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={books.length < booksPerPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Вперед
        </button>
      </div>
      {showForm && <BookForm onCreate={handleCreate} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default IndexPage;
