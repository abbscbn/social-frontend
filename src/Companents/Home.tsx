import React, { useEffect, useState } from "react";
import PostService from "../Services/PostService";
import { PostType } from "../Types/Types";
import Post from "./Post";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

function Home() {
  const [posts, Setposts] = useState<PostType[] | null>();

  const getPost = async () => {
    const response: PostType[] = await PostService.getPost();
    if (response) {
      Setposts(response);
    } else {
      console.log("hata oluştu");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            height: "100vh",
            alignItems: "center",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        >
          <div style={{ marginTop: "10px" }}>
            {posts?.map((post: PostType, key: number) => (
              <Post
                key={key}
                title={post.title}
                text={post.text}
                initial={post.user.username.charAt(0)}
                userId={post.user.id ? post.user.id : 0}
                username={post.user.username}
                postId={post.id}
                createTime={post.createTime}
                user={post.user}
              />
            ))}
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default Home;
