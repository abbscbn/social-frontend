export interface UserType {
  id?: number;
  username: string;
  password: string;
  createTime: Date;
  profilePicture: string;
  accessToken: string;
  refleshToken: string;
}
export interface PostType {
  id: number;
  title: string;
  text: string;
  user: UserType;
  createTime: Date;
}
export interface CommentType {
  id: number;
  text: string;
  user: UserType;
  post: PostType;
  createTime: Date;
}
