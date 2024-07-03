import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getBooks = async (page: number, limit: number) => {
  try {
    const response = await api.get('/books', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const createBook = async (formData: FormData) => {
  try {
    const response = await api.post('/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка создания книги:', error);
    throw error;
  }
};


export default api;
