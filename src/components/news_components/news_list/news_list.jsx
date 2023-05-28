import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../search/search";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";
import { auth, db } from "../../../firebase";

const NewsList = ({ type, start, end, newsApi }) => {
  const [articles, setArticles] = useState([]);
  const [newsFavorites, setNewsFavorites] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    loadAllFavorites(); //загрузка данных из "favorites" в firebase при авторизации
  }, [user]);

  const loadAllFavorites = async () => {
    const newsFavoritesRef = collection(db, "favorites"); //Коллекция "favorites" в firebase
    const whereCombinedId = where("userId", "==", auth.currentUser.email);

    const userQuery = query(newsFavoritesRef, whereCombinedId);

    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      let newsFavorites = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newsFavorites.push(data);
        console.log("Favorite item:", data);
      });
      setNewsFavorites(newsFavorites);
    } else {
      console.log("No favorite items found.");
    }
  };

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${type}&apiKey=${newsApi}`
      );
      let array = [];
      for (let i = start; i < end; i++) {
        const article = response.data.articles[i];
        article["isFavorite"] = false; // Add new key/value pair
        array.push(article);
      }
      // console.log(array);

      const updatedArticles = array.map((article) => {
        const matchedFavorite = newsFavorites.find(
          (favorite) => favorite.url === article.url
        );
        if (matchedFavorite) {
          return { ...article, isFavorite: true };
        }
        return article;
      });
      
      if (newsFavorites.length !== 0) {
        console.log(newsFavorites);
        console.log(updatedArticles);
        setArticles(updatedArticles);
      }
    };
    getArticles();
  }, [type, start, end, newsApi, newsFavorites]);

  return (
    <div>
      <Search articles={articles} />
    </div>
  );
};

export default NewsList;
