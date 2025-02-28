import { AxiosResponse } from "axios";
import axios from "../Config/Axios";

class UserService {
  getPic(userId: number): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`/users/getpic?userId=${userId}`)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new UserService();
