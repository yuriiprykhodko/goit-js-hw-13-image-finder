const BASE_URL = "https://pixabay.com/api";

export default class NewsApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
  fetchHits() {
    return fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=21893173-2e6903a6fb362f8aa14208207`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Error fatching data");
      })
      .then((data) => {
        this.incrementPage();
        return data.hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
