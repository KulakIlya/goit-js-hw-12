// const searchForm = document.querySelector('.search-form');
// const cardsList = document.querySelector('.card-list');
// const loader = document.querySelector('.loader');
// const loadMoreBtn = document.querySelector('.load-more-btn');

// let currentSearchQuery = '';
// let currentPage = 10;

// searchForm.addEventListener('submit', onSearchFormSubmit);
// loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

// function onLoadMoreBtnClick() {
//   fetchCards(currentSearchQuery, ++currentPage).then(renderCards);
// }

// async function onSearchFormSubmit(e) {
//   e.preventDefault();

//   currentPage = 10;

//   currentSearchQuery = e.currentTarget.elements.search.value;
//   e.currentTarget.elements.search.value = '';

//   cardsList.innerHTML = '';
//   toggleLoader();

//   const data = await fetchCards(currentSearchQuery);

//   renderCards(data);

//   showLoadMoreBtn();

//   toggleLoader();
// }

// function renderCards({ hits }) {
//   if (!hits.length)
//     return iziToast.error({
//       title: 'Error',
//       message:
//         'Sorry, there are no images matching your search query. Please try again!',
//       position: 'topRight',
//     });
//   const markup = getMarkup(hits);
//   cardsList.insertAdjacentHTML('beforeend', markup);

//   simplelightboxInstance.refresh();
// }

// function getMarkup(data) {
//   return data
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `<li class="card-item">
//   <a href=${largeImageURL}
//     ><img src=${webformatURL} alt="${tags}" height="200"/>
//     <ul class="card-info">
//       <li>
//         Likes
//         <p>${likes}</p>
//       </li>
//       <li>
//         Views
//         <p>${views}</p>
//       </li>
//       <li>
//         Comments
//         <p>${comments}</p>
//       </li>
//       <li>
//         Downloads
//         <p>${downloads}</p>
//       </li>
//     </ul></a
//   >
// </li>`
//     )
//     .join('');
// }

// function toggleLoader() {
//   loader.classList.toggle('is-hidden');
// }

// function showLoadMoreBtn() {
//   if (loadMoreBtn.classList.contains('is-hidden'))
//     loadMoreBtn.classList.remove('is-hidden');
// }

import { settings } from './helpers';
import model from './model';
import view from './view';

async function onSearchFormSubmit(e) {
  e.preventDefault();

  settings.currentSearchQuery = e.currentTarget.elements.search.value;

  if (!settings.currentSearchQuery.trim()) return;

  settings.currentPage = 1;

  e.currentTarget.elements.search.value = '';

  view.clearCardsList();
  view.toggleLoader();
  view.hideLoadMoreBtn();

  settings.isLastPage = false;

  const data = await model.fetchCards(settings.currentSearchQuery);

  view.renderCards(data);

  view.showLoadMoreBtn();

  view.toggleLoader();
}

async function onLoadMoreBtnClick() {
  view.hideLoadMoreBtn();
  view.toggleLoader();

  const res = await model.fetchCards(
    settings.currentSearchQuery,
    ++settings.currentPage
  );
  view.toggleLoader();

  view.renderCards(res);

  view.scrollToNewCards();

  if (!settings.isLastPage) view.showLoadMoreBtn();
}

function init() {
  view.setSearchFormSubmitListener(onSearchFormSubmit);
  view.setLoadMoreBtnClickListener(onLoadMoreBtnClick);
}

init();
