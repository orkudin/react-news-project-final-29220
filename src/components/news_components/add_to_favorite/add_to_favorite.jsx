import React, { useState } from "react";
import { auth, db } from "../../../firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./add_to_favorite.css";

const FavoriteButton = ({ item }) => {
  const favoritesRef = collection(db, "favorites"); //Коллекция "favorites" в firebase
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);
  // console.log(item.isFavorite);

  const addToFavorites = async () => {
    const favoritesQuery = query(
      favoritesRef,
      where("url", "==", item.url),
      where("userId", "==", auth.currentUser.email)
    );
    const querySnapshot = await getDocs(favoritesQuery);

    if (querySnapshot.size === 0) {
      await addDoc(favoritesRef, {
        favorites_item: item,
        userId: auth.currentUser.email, //дата отправки,
        url: item.url,
        isFavorite: true,
      });
      setIsFavorite(true);
      console.log("Item added to favorites.");
    } else {
      const docId = querySnapshot.docs[0].id;
      const docRef = doc(favoritesRef, docId);
      await deleteDoc(docRef);
      setIsFavorite(false);
      console.log("Item deleted from favorites.");
    }
  };
  return (
    <>
      <button className="favorite-button" onClick={addToFavorites}>
        {isFavorite ? (
          <img src="/favorite-true.svg" width="30" alt="Favorite Icon" />
        ) : (
          <img src="/favorite-false.svg" width="30" alt="Favorite Icon" />
        )}
        Add to Favorites
      </button>
    </>
  );
};
export default FavoriteButton;
