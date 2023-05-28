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


function App() {
  let newsApi = "4785429065c9459eb2f8bde6256ce9c7";
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
