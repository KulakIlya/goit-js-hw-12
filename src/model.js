import axios from 'axios';
import iziToast from 'izitoast';

import { API_KEY, BASE_URL, PER_PAGE, settings } from './helpers';

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

      if (res.data.totalHits <= page * PER_PAGE && res.data.totalHits) {
        settings.isLastPage = true;
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default new Model();
