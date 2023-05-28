import React from "react";
import NewsGrid from "../components/news_components/news_grid/news_grid";
import Header from "../components/news_components/header/header";
const Anime = ({ newsApi }) => {
  var type_s = "anime";
  return (
    <>
      <Header />

      <div>
        <NewsGrid type={type_s} newsApi={newsApi} />
      </div>
    </>
  );
};

export default Anime;
