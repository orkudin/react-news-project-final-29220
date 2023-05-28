import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import Header from "./news_components/header/header";
import NewsItem from "./news_components/news_item/news_item";

const Account = () => {
  const [newsFavorites, setNewsFavorites] = useState([]);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const toResetPage = async () => {
    try {
      navigate("/reset");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    loadAllFavorites();//загрузка данных из "favorites" в firebase при авторизации
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


  return (
    <>
      <Header />
      <div className="max-w-[600px] mx-auto my-10 p-4">
        <h1 className="text-3xl font-bold py-4 text-black">
          Account Information
        </h1>

        <p>User Email: {user && user.email}</p>

        <button onClick={handleLogout} className="border px-6 py-2 my-2">
          Logout
        </button>

        <button onClick={toResetPage} className="border px-6 py-2 my-2">
          Reset password
        </button>
      </div>
      {newsFavorites.map((articles) => {
        //list
        return (
          <>
            <NewsItem
              title={articles.favorites_item.title}
              description={articles.favorites_item.description}
              url={articles.favorites_item.url}
              urlToImage={articles.favorites_item.urlToImage}
              publishedAt={articles.favorites_item.publishedAt}
              articles={articles}
            />
          </>
        );
      })}
    </>
  );
};

export default Account;
