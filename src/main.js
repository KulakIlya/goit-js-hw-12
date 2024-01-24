import iziToast from 'izitoast';
import { PER_PAGE, settings } from './helpers';
import model from './model';
import view from './view';

class Main {
  constructor() {
    view.setSearchFormSubmitListener(this.onSearchFormSubmit.bind(this));
    view.setLoadMoreBtnClickListener(this.onLoadMoreBtnClick.bind(this));
  }

  async onSearchFormSubmit(e) {
    e.preventDefault();

    settings.currentSearchQuery = e.currentTarget.elements.search.value;

    if (!settings.currentSearchQuery.trim()) return;

    settings.currentPage = 1;
    settings.isLastPage = false;

    e.currentTarget.elements.search.value = '';

    view.clearCardsList();
    view.toggleLoader();
    view.hideLoadMoreBtn();

    const data = await model.fetchCards(
      settings.currentSearchQuery,
      settings.currentPage
    );

    this.isLastPage(data);

    view.renderCards(data);

    if (!settings.isLastPage && data.totalHits) view.showLoadMoreBtn();
    view.toggleLoader();
  }

  async onLoadMoreBtnClick() {
    view.hideLoadMoreBtn();
    view.toggleLoader();

    const data = await model.fetchCards(
      settings.currentSearchQuery,
      ++settings.currentPage
    );

    view.toggleLoader();
    this.isLastPage(data);
    view.renderCards(data);

    view.scrollToNewCards();
    if (!settings.isLastPage) view.showLoadMoreBtn();
  }

  isLastPage(data) {
    if (data.totalHits <= settings.currentPage * PER_PAGE && data.totalHits) {
      settings.isLastPage = true;
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });

      return;
    }
  }
}

const app = new Main();
