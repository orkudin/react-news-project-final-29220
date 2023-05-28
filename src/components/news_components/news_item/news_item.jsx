import React from "react";
import "./news_item.css";
import FavoriteButton from "../add_to_favorite/add_to_favorite";
import { UserAuth } from "../../../context/AuthContext";
import DeleteNews from "../delete_news/delete_news";

const NewsItem = ({
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  articles,
}) => {
  const { user} = UserAuth();

  return (
    <div class="grid-item">
      <div class="image">
        <img src={urlToImage} alt={urlToImage} />
      </div>

      {user ? <FavoriteButton item={articles} /> : null}

      <DeleteNews item={articles}/> 
      

      <div className="info">
        <h3>{title}</h3>
        <div className="info-text">
          <p>{description}</p>
        </div>
        <div className="button-wrap">
          <a className="atuin-btn" href={url}>
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
