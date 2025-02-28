import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "../Config/Axios";
import { UserType } from "../Types/Types";

class LikeService {
  saveLike(userId: number, postId: number) {
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
          "/like",
          {
            userId: userId,
            postId: postId,
          },
          config
        )
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }

  getLikeCountByPostId(postId: number): Promise<number> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`/like/${postId}`)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }

  removeLike(userId: number, postId: number) {
    const currentUser: UserType = JSON.parse(
      localStorage.getItem("currentUser") as string
    );
    return new Promise((resolve: any, reject: any) => {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        params: {
          // params kısmına ekliyoruz
          userId: userId,
          postId: postId,
        },
      };

      axios
        .delete("/like", config)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }

  checkLikedPostByUserId(postId: number, userId: number): Promise<boolean> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`/like?postId=${postId}&userId=${userId}`)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new LikeService();
