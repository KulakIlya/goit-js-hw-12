import { settings } from './helpers';
import model from './model';
import view from './view';

class Main {
  constructor() {
    view.setSearchFormSubmitListener(this.onSearchFormSubmit.bind(this));
    view.setLoadMoreBtnClickListener(this.onLoadMoreBtnClick);
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

    view.renderCards(data);

    // this.createObserver();

    if (!settings.isLastPage && data.totalHits) view.showLoadMoreBtn();
    view.toggleLoader();
  }

  async onLoadMoreBtnClick() {
    view.hideLoadMoreBtn();
    view.toggleLoader();

    const res = await model.fetchCards(
      settings.currentSearchQuery,
      ++settings.currentPage
    );

    view.toggleLoader();
    view.renderCards(res);

    // this.createObserver();

    view.scrollToNewCards();
    if (!settings.isLastPage) view.showLoadMoreBtn();
  }

  createObserver() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(item => {
          if (item.isIntersecting) {
            this.onLoadMoreBtnClick();
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );
    const target = document.querySelector('.card-item:last-of-type');
    observer.observe(target);
  }
}

const app = new Main();
