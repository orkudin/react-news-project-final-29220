import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

const Header = () => {
  const { user } = UserAuth();

  return (
    <>
      <nav id="main-menu">
        <Link to="/popular" class="logo">
          NEWS
        </Link>
        <ul>
          <li>
            <Link to="/popular">popular</Link>
          </li>
          <li>
            <Link to="/game">game</Link>
          </li>
          <li>
            <Link to="/movie">movie</Link>
          </li>
          <li>
            <Link to="/anime">anime</Link>
          </li>
          <li>
            <Link to="/sport">sport</Link>
          </li>
          <li>
            <Link to="/account">{(user && user.email) || "account"}</Link>
          </li>
        </ul>
      </nav>

      <input type="checkbox" id="hamburger-input" class="burger-shower" />
      <label id="hamburger-menu" for="hamburger-input">
        <nav id="sidebar-menu">
          <h3>Menu</h3>
          <ul>
            <li>
              <Link to="/account">account</Link>
            </li>
            <li>
              <Link to="/popular">popular</Link>
            </li>
            <li>
              <Link to="/game">game</Link>
            </li>
            <li>
              <Link to="/movie">movie</Link>
            </li>
            <li>
              <Link to="/anime">anime</Link>
            </li>
            <li>
              <Link to="/sport">sport</Link>
            </li>
          </ul>
        </nav>
      </label>

      <div class="overlay"></div>
    </>
  );
};

export default Header;
