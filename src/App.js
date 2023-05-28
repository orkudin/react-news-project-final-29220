import React from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Resetpassword from "./components/Resetpassword";
import { AuthContextProvider } from "./context/AuthContext";

import { Route, Routes, Navigate } from "react-router-dom";

import Anime from "./pages/Anime";
import Game from "./pages/Game";
import Movie from "./pages/Movie";
import Sport from "./pages/Sport";
import Popular from "./pages/Popular";

// import {articles} from "./components/news_components/news_list/news_list"

import CurrencyConverter from "./components/currency_converter/currency_converter_api/currency_converter";
// import CurrencyConverter from './components/CurrencyConverter';

function App() {
  let newsApi = "1c97eb92463b4786bc8c16e9d1598f7f";
  let currencyApi = "4JbzDjxRrl4AfOvViI5MRMUL02ux6Xzh";
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/popular" />} />
          <Route path="/popular" element={<Popular newsApi={newsApi} />} />
          <Route path="/game" element={<Game newsApi={newsApi} />} />
          <Route path="/anime" element={<Anime newsApi={newsApi} />} />
          <Route path="/movie" element={<Movie newsApi={newsApi} />} />
          <Route path="/sport" element={<Sport newsApi={newsApi} />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/reset" element={<Resetpassword />}></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
