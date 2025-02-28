import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "../Config/Axios";
import { PostType, UserType } from "../Types/Types";

class PostService {
  getPost(): Promise<PostType[]> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get("/posts")
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }

  savePost(userId: number, title: string, text: string): Promise<PostType[]> {
    const currentUser: UserType = JSON.parse(
      localStorage.getItem("currentUser") as string
    );
    return new Promise((resolve: any, reject: any) => {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };

      axios
        .post(
          "/posts/save",
          {
            userId: userId,
            title: title,
            text: text,
          },
          config
        )
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }

  deletPost(postId: number) {
    const currentUser: UserType = JSON.parse(
      localStorage.getItem("currentUser") as string
    );
    return new Promise((resolve: any, reject: any) => {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };

      axios
        .delete(`/posts/${postId}`, config)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }

  getPostByUserId(userId: number): Promise<PostType[]> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`/posts?userId=${userId}`)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new PostService();
