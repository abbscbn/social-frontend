import { Route, Routes } from "react-router-dom";
import Home from "../Companents/Home";
import User from "../Companents/User";
import Login from "../Companents/Login";
import NewPost from "../Companents/NewPost";
import Register from "../Companents/Register";

function RouterConfig() {
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
