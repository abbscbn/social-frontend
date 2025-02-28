import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import LoginService from "../Services/LoginService";
import { UserType } from "../Types/Types";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/AppSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsername = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setusername(e.target.value);
  };

  const handlePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setpassword(e.target.value);
  };

  const login = async () => {
    const payload: UserType = {
      username: username,
      password: password,
    };

    const response: UserType = await LoginService.checkUser(payload);

    if (response) {
      console.log(response);

      dispatch(setCurrentUser(response));
      localStorage.setItem("currentUser", JSON.stringify(response));
      navigate("/");
    } else {
      alert("Kullanıcı adı veya şifre yanlış");
    }
  };

  return (
    <div className="Login">
      <div
        style={{
          marginTop: "-50px",
          border: "1px solid white",
          padding: "40px",
          borderRadius: "10px",
        }}
      >
        <div>
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              handleUsername(e);
            }}
            color="success"
            label="Kullanıcı Adı"
            variant="filled"
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              handlePassword(e);
            }}
            color="success"
            type="password"
            label="Şifre"
            variant="filled"
          />
        </div>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            margin: "10px",
          }}
        >
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginRight: "10px", minWidth: "87.172px" }}
          >
            İptal
          </Button>
          <Button
            onClick={login}
            variant="contained"
            color="success"
            size="small"
          >
            Giriş Yap
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
