// src/app/page.tsx
'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getBooks, createBook } from '../api';
import { Book } from '../types';

const BookList = dynamic(() => import('../components/BookList'), { ssr: false });
const BookForm = dynamic(() => import('../components/BookForm'), { ssr: false });

const IndexPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const booksPerPage = 5;

  const fetchBooks = async (pageNum: number) => {
    try {
      const data = await getBooks(pageNum, booksPerPage);
      setBooks(data);
    } catch (error) {
      console.error('Ошибка при получении списка книг:', error);
    }
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  const handleCreate = async (dataCheck: [string, string, File | null]) => {
    const [title, description, cover] = dataCheck;

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (cover) {
        formData.append('cover', cover);
      }

      console.log('DataCheck:', dataCheck);
      console.log('FormData entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      await createBook(formData);
      fetchBooks(page); // Обновляем список книг после создания новой книги
      setShowForm(false); // Закрываем форму после успешного создания
    } catch (error) {
      console.error('Ошибка при создании книги:', error);
    }
  };

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
      {showForm && <BookForm onSubmit={handleCreate} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default IndexPage;
