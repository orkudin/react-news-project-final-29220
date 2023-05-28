import React, { useState } from "react";
import './add_news.css';

const PopupForm = () => {
  const [category, setCategory] = useState("popular");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [urlToImage, setUrlToImage] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [articles, setArticles] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      title.length !== 0 &&
      description.length !== 0 &&
      url.length !== 0 &&
      urlToImage !== 0
    ) {
      // Retrieve existing array data from localStorage
      const existingData = localStorage.getItem(category);
      let articles = [];

      if (existingData) {
        articles = JSON.parse(existingData);
      }

      // Create a new object with form inputs
      const newArticle = {
        title,
        description,
        url,
        urlToImage,
        isFavorite: false,
      };
      // setArticles([newArticle, ...articles]);
      articles.unshift(newArticle);
    //   setArticles([newArticle, ...articles]);

      // Convert the updated array to string and store it back in localStorage
      localStorage.setItem(category, JSON.stringify(articles));

      // Reset form inputs
      setTitle("");
      setDescription("");
      setUrl("");
      setUrlToImage("");
      setPublishedAt("");
    }else{
        alert("Fill the form to add news!")
    }
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenForm}>Add Article</button>

      {isFormOpen && (
        <div className="popup-form" id="overlay">
          <form onSubmit={handleFormSubmit}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="popular">Popular</option>
              <option value="movie">Movie</option>
              <option value="game">Game</option>
              <option value="anime">Anime</option>
              <option value="sport">Sport</option>
            </select>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={urlToImage}
              onChange={(e) => setUrlToImage(e.target.value)}
            />
            <button className="button-form" type="submit">Add</button>
          </form>
          <button className="button-form" onClick={handleCloseForm}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
