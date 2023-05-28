import React from "react";

const DeleteNews = ({ item }) => {
  const deleteNews = () => {
    console.log("delete");
    console.log(item);
    // Получить массив из локлального хранилища по категории
    const arrayString = localStorage.getItem(item.category);
    let array = JSON.parse(arrayString);

    // Удалить новость по айди
    if (item.index !== -1) {
      array.splice(item.index, 1);
    }

    // Пересохранить массив с данными
    localStorage.setItem(item.category, JSON.stringify(array));
  };

  return <button onClick={deleteNews}>Delete news</button>;
};

export default DeleteNews;
