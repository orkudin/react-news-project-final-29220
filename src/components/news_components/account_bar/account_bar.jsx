import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import "./account_bar.css";

function account_bar() {
  const { user } = UserAuth();

  return (
    <div class="container">
      <ul class="button-group">
        {user && user.email ? (
          <li class="button">
            <Link to="/account">{(user && user.email) || "SIGN IN"}</Link>
          </li>
        ) : (
          <li class="button">
            <Link to="/signin">{(user && user.email) || "SIGN IN"}</Link>
          </li>
        )}

        {user && user.email ? null : (
          <li class="button">
            <Link to="/signup">SIGN UP</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default account_bar;
