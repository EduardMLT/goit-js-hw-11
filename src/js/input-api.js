'use strict';
import axios from 'axios';

export class GalleryAPI {
  #API_KEY = '38232376-4840eb4d2a32943b9bc00372c';
  #BASE_URL = `https://pixabay.com/api/`;
  page = 1;
  q = null;

  async fetchImages() {
    return await axios.get(`${this.#BASE_URL}`, {
      params: {
        q: this.q,
        key: this.#API_KEY,
        page: this.page,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 40,
      },
    });
  }
}