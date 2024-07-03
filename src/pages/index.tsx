import React, { useState } from 'react';
import Head from 'next/head';
import BookList from '@/components/BookList';
import CreateBookModal from '@/components/CreateBookModal';

const IndexPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Head>
        <title>My Book App</title>
        <meta name="description" content="List of books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">List of Books</h1>

        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add Book
        </button>

        <BookList />

        {showModal && <CreateBookModal onClose={closeModal} />}
      </main>
    </div>
  );
};

export default IndexPage;
