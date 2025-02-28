import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "../Config/Axios";
import { UserType } from "../Types/Types";

class RegisterService {
  registerUser(user: UserType): Promise<UserType> {
    return new Promise((resolve: any, reject: any) => {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post(
          "/register",
          {
            username: user.username, // Gönderilecek kullanıcı adı
            password: user.password, // Gönderilecek şifre
          },
          config
        )
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new RegisterService();
