import React from "react";
import NewsGrid from "../components/news_components/news_grid/news_grid";
import Header from "../components/news_components/header/header";

const Game = ({ newsApi }) => {
  var type_s = "game";
  return (
    <>
      <Header />
      <div>
        <NewsGrid type={type_s} newsApi={newsApi} />
      </div>
    </>
  );
};

export default Game;
