import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = (query, page) => {
  const KEY = '39344710-74bbb124ce1c1439ca3e67f9f';
  const options = {
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  };
  const searchParams = new URLSearchParams(options);
  return axios.get(`?q=${query}&key=${KEY}&page=${page}&${searchParams}`);
};
