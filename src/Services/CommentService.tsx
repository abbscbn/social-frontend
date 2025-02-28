import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "../Config/Axios";
import { CommentType, UserType } from "../Types/Types";

class CommentService {
  getCommentsByPostId(postId: number): Promise<CommentType[]> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`/comments?postId=${postId}`)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
  saveComment(
    postId: number,
    userId: number,
    text: string
  ): Promise<CommentType> {
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
          "/comments",
          {
            postId: postId,
            userId: userId, // Gönderilecek kullanıcı adı
            text: text, // Gönderilecek şifre
          },
          config
        )
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new CommentService();
