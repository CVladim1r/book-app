import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getBooks = async (page: number, limit: number) => {
  const response = await axios.get(`${API_URL}/books`, {
    params: { page, limit },
  });
  return response.data;
};

export const createBook = async (book: { title: string; description: string; cover: string }) => {
  const response = await axios.post(`${API_URL}/books`, book);
  return response.data;
};
