import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

class View {
  #searchForm = document.querySelector('.search-form');
  #cardsList = document.querySelector('.card-list');
  #loader = document.querySelector('.loader');
  #loadMoreBtn = document.querySelector('.load-more-btn');

  #currentSearchQuery = '';
  #currentPage = 1;

  #simplelightboxInstance = new SimpleLightbox('.card-item a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  constructor() {
    // this.#searchForm.addEventListener(
    //   'submit',
    //   this.onSearchFormSubmit.bind(this)
    // );
    // this.#loadMoreBtn.addEventListener(
    //   'click',
    //   this.onLoadMoreBtnClick.bind(this)
    // );
  }

  setSearchFormSubmitListener(callback) {
    this.#searchForm.addEventListener('submit', callback);
  }

  setLoadMoreBtnClickListener(callback) {
    this.#loadMoreBtn.addEventListener('click', callback);
  }

  onLoadMoreBtnClick() {
    fetchCards(this.#currentSearchQuery, ++this.#currentPage).then(
      this.renderCards.bind(this)
    );
  }

  renderCards({ hits }) {
    if (!hits.length)
      return iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    const markup = this.getMarkup(hits);
    this.#cardsList.insertAdjacentHTML('beforeend', markup);

    this.#simplelightboxInstance.refresh();
  }

  getMarkup(data) {
    return data
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `<li class="card-item">
    <a href=${largeImageURL}
      ><img src=${webformatURL} alt="${tags}" height="200"/>
      <ul class="card-info">
        <li>
          Likes
          <p>${likes}</p>
        </li>
        <li>
          Views
          <p>${views}</p>
        </li>
        <li>
          Comments
          <p>${comments}</p>
        </li>
        <li>
          Downloads
          <p>${downloads}</p>
        </li>
      </ul></a
    >
  </li>`
      )
      .join('');
  }

  toggleLoader() {
    this.#loader.classList.toggle('is-hidden');
  }

  showLoadMoreBtn() {
    this.#loadMoreBtn.classList.remove('is-hidden');
  }

  clearCardsList() {
    this.#cardsList.innerHTML = '';
  }

  hideLoadMoreBtn() {
    this.#loadMoreBtn.classList.add('is-hidden');
  }

  scrollToNewCards() {
    const cardItemHeight = document
      .querySelector('.card-item')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: cardItemHeight * 2,
      behavior: 'smooth',
    });
  }
}

export default new View();
