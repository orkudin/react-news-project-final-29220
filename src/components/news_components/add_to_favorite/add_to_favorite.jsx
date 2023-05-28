import React, { useEffect } from "react";
import { auth, db } from "../../../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import "./add_to_favorite.css";

const FavoriteButton = ({ item }) => {
  const messagesRef = collection(db, "favorites"); //Коллекция "favorites" в firebase

  const addToFavorites = async () => {
    console.log(item.isFavorite);

    const favoritesQuery = query(
      messagesRef,
      where("url", "==", item.url),
      where("userId", "==", auth.currentUser.email)
    );
    const querySnapshot = await getDocs(favoritesQuery);

    if (querySnapshot.size === 0) {
      await addDoc(messagesRef, {
        favorites_item: item,
        userId: auth.currentUser.email, //дата отправки,
        url: item.url,
        isFavorite: true,
      });
      console.log("Item added to favorites.");
    } else {
      console.log("Item already exists in favorites.");
    }
  };
  return (
    <>
      <button className="favorite-button" onClick={addToFavorites}>
        {item.isFavorite ? (
          <>
            <img src="/favorite-true.svg" width="30" alt="Favorite Icon" />
          </>
        ) : (
          <>
            <img src="/favorite-false.svg" width="30" alt="Favorite Icon" />
          </>
        )}
        Add to Favorites
      </button>
    </>
  );
};
export default FavoriteButton;
