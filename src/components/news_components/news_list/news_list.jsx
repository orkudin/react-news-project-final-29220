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

  // useEffect(() => {
  //   const getArticles = async () => {
  //     const response = await axios.get(
  //       `https://newsapi.org/v2/everything?q=${type}&apiKey=${newsApi}`
  //     );
  //     let array = [];
  //     for (let i = start; i < end; i++) {
  //       const article = response.data.articles[i];
  //       article["isFavorite"] = false; // Add new key/value pair
  //       array.push(article);
  //     }
  //     // console.log(array);

  //     const updatedArticles = array.map((article) => {
  //       const matchedFavorite = newsFavorites.find(
  //         (favorite) => favorite.url === article.url
  //       );
  //       if (matchedFavorite) {
  //         return { ...article, isFavorite: true };
  //       }
  //       return article;
  //     });

  //     if (newsFavorites.length !== 0) {
  //       console.log(newsFavorites);
  //       console.log(updatedArticles);
  //       setArticles(updatedArticles);
  //     }
  //   };
  //   getArticles();
  // }, [type, start, end, newsApi, newsFavorites]);

  useEffect(() => {
    const getNewsFromAPI = async () => {
      const storedDataString = localStorage.getItem(type);
      let storedData;

      // for (let i = 0; i < localStorage.length; i++) {
      //   const itemName = localStorage.key(i);
      //   console.log("Item name:", itemName);
      // }

      if (storedDataString) {
        // Data is available in localStorage, parse it
        storedData = JSON.parse(storedDataString);
        // console.log("BELOW DATA FROM LOCALSTORAGE");
        // console.log(storedData);
        // console.log("UPPER DATA FROM LOCALSTORAGE");

        const updatedArticles = storedData.map((article) => {
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
      } else {
        fetchDataFromAPI();
      }
    };
    getNewsFromAPI();
  }, [type, start, end, newsApi, newsFavorites]);

  const fetchDataFromAPI = async () => {
    console.log("FROM API RESPONSE");
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${type}&apiKey=${newsApi}`
    );
    let array = [];

    for (let i = start; i < end; i++) {
      const article = response.data.articles[i];
      article["isFavorite"] = false; // добавить новую пару key/value 
      article["category"] = type;
      article["index"] = i;
      array.push(article);
    }

    // Save the array in localStorage
    localStorage.setItem(type, JSON.stringify(array));
  };

  const refreshInterval = 5 * 60 * 1000; // 5 minutes 

  setInterval(fetchDataFromAPI, refreshInterval);//обновление данных с API

  return (
    <div>
      <Search articles={articles} />
    </div>
  );
};

export default NewsList;
