import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import PostService from "../Services/PostService";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: RootState) => state.app);

  const handleTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  const handleText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const create = async () => {
    if (currentUser?.id) {
      const response = await PostService.savePost(currentUser?.id, title, text);
      if (response) {
        navigate("/");
      } else {
        console.log("veri çekilemedi");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <div
        style={{
          padding: "20px",
          border: "2px solid lightgrey",
          borderRadius: "10px",
          columnWidth: "600px",
        }}
      >
        <h3>Yeni Gönderi Oluştur</h3>
        <div>
          <TextField
            id="outlined-basic"
            label="Başlık"
            variant="outlined"
            fullWidth
            multiline
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleTitle(e)}
          />
        </div>
        <div>
          <TextField
            style={{ marginTop: "20px" }}
            id="outlined-basic"
            label="İçerik"
            variant="outlined"
            fullWidth
            multiline
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleText(e)}
          />
        </div>
        <div
          style={{
            marginTop: "10px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button
            onClick={create}
            variant="contained"
            size="medium"
            sx={{ backgroundColor: "#0da135" }}
          >
            Oluştur
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
