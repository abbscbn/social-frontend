import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../Companents/Home";
import User from "../Companents/User";
import Login from "../Companents/Login";
import NewPost from "../Companents/NewPost";
import Register from "../Companents/Register";

function RouterConfig() {
  /* const navigate = useNavigate();

  useEffect(() => {
    // Kullanıcı login olmuş mu kontrol et
    const userLoggedIn = localStorage.getItem("currentUser"); // Eğer login bilgilerini burada saklıyorsanız

    if (userLoggedIn) {
      // Eğer kullanıcı login olmuşsa, login sayfasına gidemez. Direkt home'a yönlendir.
      navigate("/", { replace: true });
    }
  }, [navigate]); // Bu hook her renderda çalışacak şekilde ayarlandı.*/

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:Iduser" element={<User />} />
        <Route path="/newpost" element={<NewPost />} />
      </Routes>
    </div>
  );
}

export default RouterConfig;
