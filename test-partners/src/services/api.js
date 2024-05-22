import axios from 'axios';

const username = 'xp';
const password = 'xp';
const token = btoa(`${username}:${password}`);

const api = axios.create({
  baseURL: 'https://admin.x-partners.com/api/test/data/',
  headers: {
    'Authorization': `Basic ${token}`
  }
});

export const fetchData = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
