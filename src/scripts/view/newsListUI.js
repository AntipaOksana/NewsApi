import filterUI from "./filterUI";
import ApiService from "../apiService/apiServices";

class NewsListUI {
    constructor() {
        this._container = document.querySelector('.newsContainer');
        this.api = new ApiService();
        this.init()
    }

    init() {
        this.renderNewsArticles('top-headlines', {country: 'ua'})
    }

    renderNewsArticles(endpoint, query) {
        this.api.getRequest(endpoint, query)
            .then((res) => NewsListUI.createNewsFragment(res.articles))
            .then(fragment => this._container.innerHTML = fragment)
    }

    static createNewsFragment(news) {
        return news.map((article) => NewsListUI.newArticle(article)).join('')
    }

    static newArticle({author, publishedAt, description, title, url, urlToImage}) {
        return `<article class="article">
            <img src=${urlToImage} class="articleImage">
            <h3>${title}</h3>
            <p>${description}</p>
            <a href=${url}>Ccылка на новость</a>
            <div class="articleText">
            <cite>${author}</cite>
            <time>${publishedAt}</time>
            </div>
            </article>`
    }

}

export default NewsListUI

