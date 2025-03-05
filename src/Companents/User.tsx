import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../Services/PostService";
import { PostType, UserType } from "../Types/Types";
import UserPosts from "./UserPosts";
import { Button } from "@mui/material";
import axios from "axios";
import UserService from "../Services/UserService";
function User() {
  const { Iduser } = useParams();

  const [userposts, setuserposts] = useState<PostType[] | null>([]);
  const [user, setUser] = useState<UserType>();
  const [otherUserPic, setotherUserPic] = useState<string>();

  const [file, setFile] = useState<File | null>(null);

  const getPostsByUserId = async () => {
    const Response: PostType[] = await PostService.getPostByUserId(
      Number(Iduser)
    );
    if (Response.length == 0) {
      setuserposts(null);
    } else {
      setuserposts(Response);
    }
  };

  const refleshUserPic = async () => {
    const response = await UserService.getPic(Number(Iduser));
    if (response) {
      setotherUserPic(response);
    }
  };

  const GetCurrentUserFromLocalStorage = () => {
    const result = localStorage.getItem("currentUser");

    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType;
      setUser(currentUser);
    }
  };

  useEffect(() => {
    refleshUserPic();
    setuserposts([]); // Eski postları sıfırlayabilirsiniz
    // Profil resmini sıfırlayın
    getPostsByUserId();
    GetCurrentUserFromLocalStorage();
  }, [Iduser]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Form gönderildiğinde dosyayı backend'e gönderme
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Dosya seçilmemişse hata mesajı gösterelim
    if (!file) {
      alert("Lütfen bir dosya seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `http://http://backend-social-production.up.railway.app/api/upload?userId=${Iduser}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      alert("Profil fotoğrafı başarıyla yüklendi!");
      window.location.reload();
    } catch (error) {
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h2>Gönderiler</h2>
      </div>

      {Iduser == user?.id ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ padding: "10px" }}>Kullancı Adı:{user?.username}</div>

          <div
            style={{
              border: "1px solid lightgray",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <img
              style={{
                width: "130px",
                height: "150px",
                borderRadius: "50%",
                padding: "10px",
              }}
              src={`http://backend-social-production.up.railway.app/uploads/${otherUserPic}`}
              alt=""
            />
          </div>

          <div
            style={{ padding: "20px", display: "flex", flexDirection: "row" }}
          >
            <label
              className="label"
              style={{
                border: "1px solid black",
                padding: "5px",
                borderRadius: "10px",
                marginRight: "5px",

                cursor: "pointer",
              }}
              htmlFor="inputField"
            >
              Dosya Seç
            </label>
            <input
              id="inputField"
              style={{ display: "none" }}
              type="file"
              onChange={handleFileChange}
            />
            <form onSubmit={handleSubmit}>
              <Button size="small" variant="contained" type="submit">
                Fotoğraf Yükle
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ margin: "10px" }}>
          <div
            style={{
              border: "1px solid lightgray",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <img
              style={{
                width: "130px",
                height: "150px",
                borderRadius: "50%",
                padding: "10px",
              }}
              src={`http://backend-social-production.up.railway.app/uploads/${otherUserPic}`}
              alt=""
            />
          </div>
        </div>
      )}

      <div>
        {userposts != null ? (
          userposts.map((post: PostType, key: number) => (
            <UserPosts
              key={key}
              title={post.title}
              text={post.text}
              initial={post.user.username.charAt(0)}
              userId={Number(Iduser)}
              username={post.user.username}
              postId={post.id}
              createTime={post.createTime}
              profilePicture={post.user.profilePicture}
            />
          ))
        ) : (
          <div>Henüz Gönderiniz bulunmamaktdır</div>
        )}
      </div>
    </div>
  );
}

export default User;
