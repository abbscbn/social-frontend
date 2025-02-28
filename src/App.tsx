import { useEffect } from "react";
import "./App.css";
import "./css/login.css";
import RouterConfig from "./Config/RouterConfig";
import Navbar from "./Companents/Navbar";
import "./css/post.css";
import "./css/navbar.css";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./Redux/AppSlice";
import { UserType } from "./Types/Types";
import { useLocation } from "react-router-dom";

function App() {
  
  const dispatch = useDispatch();
  const location = useLocation(); // Use useLocation hook to track the URL
  const getCurrentUser = () => {
    const result = localStorage.getItem("currentUser");
    if (result) {
      const currentUser = JSON.parse(result) as UserType;
      
      dispatch(setCurrentUser(currentUser));
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  return (
    <div>
      {/* Conditionally render the Navbar */}
      {!isLoginPage && !isRegisterPage && <Navbar />}

      <div className="mainContainer">
        <RouterConfig />
      </div>
    </div>
  );
}

export default App;
