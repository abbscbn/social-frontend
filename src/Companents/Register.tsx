import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { UserType } from "../Types/Types";
import { useNavigate } from "react-router-dom";
import RegisterService from "../Services/RegisterService";

function Register() {
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");

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

  const register = async () => {
    const payload: UserType = {
      username: username,
      password: password,
    };

    if (username.trim() == "" || password.trim() == "") {
      alert("Lütfen Alanarı doldurun");
      setpassword("");
      setusername("");
      return;
    }

    const response: UserType = await RegisterService.registerUser(payload);

    if (response) {
      alert("Kayıt Başarılı");
      navigate("/login");
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
            value={username}
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
            value={password}
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
            onClick={register}
            variant="contained"
            color="success"
            size="small"
          >
            Kayıt Ol
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Register;
