import React from "react";
import NewsGrid from "../components/news_components/news_grid/news_grid";
import Header from "../components/news_components/header/header";

const Movie = ({ newsApi }) => {
  var type_s = "movie";
  return (
    <>
      <Header />
      <div>
        <NewsGrid type={type_s} newsApi={newsApi} />
      </div>
    </>
  );
};

export default Movie;
