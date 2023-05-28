import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import "./account_bar.css";
import PopupForm from "../add_news_pop_up_form/add_news";

function account_bar() {
  const { user } = UserAuth();

  return (
    <div class="container">
      <ul class="button-group">
        {user && user.email ? (
          <li class="button">
            <Link to="/account">{"FAVORITES"}</Link>
          </li>
        ) : (
          <li class="button">
            <Link to="/signin">{"SIGN IN"}</Link>
          </li>
        )}

        {user && user.email ? null : (
          <li class="button">
            <Link to="/signup">SIGN UP</Link>
          </li>
        )}
        {user && user.email ? (
          <li class="button">
            <PopupForm />
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default account_bar;
