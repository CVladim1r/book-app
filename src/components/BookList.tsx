import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/components/BookList.module.css';
interface Book {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10); // Количество книг на странице

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/books', {
          params: {
            skip: (currentPage - 1) * booksPerPage,
            limit: booksPerPage,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center col-span-full">Loading...</p>
        ) : books.length === 0 ? (
          <p className="text-center col-span-full">No books found.</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{book.description}</p>
                <li className={styles.bookItem}>Book 1</li>
                <li className={styles.bookItem}>Book 2</li>
                <div className="flex justify-end">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {books.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md ${
              currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className={`px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md ml-1 ${
              books.length < booksPerPage ? 'cursor-not-allowed' : 'hover:bg-gray-300'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList;
