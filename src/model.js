import axios from 'axios';

import { API_KEY, BASE_URL, PER_PAGE } from './helpers';

class Model {
  constructor() {}

  async fetchCards(searchQuery, page) {
    try {
      const res = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: searchQuery,
          per_page: PER_PAGE,
          page,
          _image_type: 'photo',
          _orientation: 'horizontal',
          _safesearch: true,
        },
      });

      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default new Model();
