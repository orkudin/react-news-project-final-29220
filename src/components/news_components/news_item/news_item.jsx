import React from "react";
import "./news_item.css";
import FavoriteButton from "../add_to_favorite/add_to_favorite";
import { UserAuth } from "../../../context/AuthContext";

const NewsItem = ({
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  articles,
}) => {
  const { user, logout } = UserAuth();

  return (
    <div class="grid-item">
      <div class="image">
        <img src={urlToImage} alt={urlToImage} />
      </div>

      {user ? <FavoriteButton item={articles} /> : null}
      
      <div class="info">
        <h3>{title}</h3>
        <div class="info-text">
          <p>{description}</p>
        </div>
        <div class="button-wrap">
          <a class="atuin-btn" href={url}>
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
