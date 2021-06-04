import "./sass/main.scss";
import hitsTpl from "./templeats/templeate.hbs";
import NewsApiService from "./apiService.js";
import { debounce } from "lodash";
const refs = {
  searchForm: document.querySelector(".search-form"),
  gallery: document.querySelector(".gallery"),
  loadMoreBtn: document.querySelector("[data-action=load-more]"),
  box: document.querySelector(".box"),
};
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener("input", debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener("click", onLoadMore);

function onSearch(event) {
  event.preventDefault();

  newsApiService.query = event.target.value;
  newsApiService.resetPage();
  newsApiService.fetchHits().then((hits) => {
    clearHitsContainer();

    appendHitsMarkup(hits);
  });
}
function onLoadMore() {
  newsApiService.fetchHits().then(appendHitsMarkup);
  refs.box.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}
function appendHitsMarkup(hits) {
  refs.gallery.insertAdjacentHTML("beforeend", hitsTpl(hits));
}
function clearHitsContainer() {
  refs.gallery.innerHTML = "";
}
