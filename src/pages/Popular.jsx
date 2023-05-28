import React from "react";
import NewsGrid from "../components/news_components/news_grid/news_grid";
import Header from "../components/news_components/header/header";

const Popular = ({ newsApi }) => {
  var type_s = "popular";
  return (
    <>
      <Header />
      <div>
        <NewsGrid type={type_s} newsApi={newsApi} />
      </div>
    </>
  );
};

export default Popular;
