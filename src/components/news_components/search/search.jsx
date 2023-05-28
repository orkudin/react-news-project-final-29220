import React, { Component } from "react";
import NewsItem from "../news_item/news_item";
import "./search.css";
import FavoriteButton from "../add_to_favorite/add_to_favorite";

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filteredNews: this.props.articles, //фильтрованный массив, по умолчанию: все данные из API
      searchValue: "", //поиск по запросу
      isOpen: true, //проверка на автозаполнение
      isSelect: true, //используется для выделения всего текста из запроса
    };
  }

  componentDidMount() {
    this.updateFilteredNews(this.props.articles);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.articles !== this.props.articles) {
      this.updateFilteredNews(this.props.articles);
    }
  }

  updateFilteredNews(articles) {
    const { searchValue } = this.state;

    const filteredNews = articles.filter((news) => {
      return news.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    this.setState({ filteredNews });
  }

  filterArticles(articles, searchValue) {
    //поиск новости по запросу
    return articles.filter((news) => {
      return news.title.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  handleSearchChange = (event) => {
    //метод для input, отлавливает изменения запроса при вводе
    const searchValue = event.target.value;
    const filteredNews = this.filterArticles(this.props.articles, searchValue);

    this.setState({
      filteredNews,
      searchValue,
    });
  };

  inputClickHandler = (e) => {
    //используется для опредее=ления isOpen на true
    if (this.state.isSelect) {
      e.target.select();
    }
    this.setState({
      isOpen: true,
      isSelect: false,
    });
  };

  newsClickHandler = (e) => {
    //метод для autocomplete, отлавливает изменения запроса при выборе
    const searchValue = e.target.textContent;
    const filteredNews = this.filterArticles(this.props.articles, searchValue);

    this.setState({
      searchValue,
      isOpen: false,
      isSelect: true,
      filteredNews,
    });
  };

  render() {
    const { filteredNews, searchValue, isOpen } = this.state;
    // console.log("Check searchValue in render(): " + searchValue);
    // console.log("Check filteredNews in render(): " + filteredNews);
    return (
      <div>
        <div className="search_form">
          <form>
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={this.handleSearchChange}
              onClick={this.inputClickHandler}
            />
            <ul className="autocomplete">
              {searchValue && isOpen
                ? filteredNews.map((articles) => {
                    return (
                      <li
                        className="autocomplete_item"
                        onClick={this.newsClickHandler}
                      >
                        {articles.title}
                      </li>
                    );
                  })
                : null}
            </ul>
          </form>
        </div>

        {filteredNews.map((articles) => {
          //list
          return (
            <>
              <NewsItem
                title={articles.title}
                description={articles.description}
                url={articles.url}
                urlToImage={articles.urlToImage}
                publishedAt={articles.publishedAt}
                articles = {articles}
              />
            </>
          );
        })}
      </div>
    );
  }
}
