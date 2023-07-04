import axios from "axios";
import { PhotosType, ProfileType, UserType } from "../utils/types";

const Server = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "9825e6dc-3ad2-41c3-b46e-d70834409691",
  },
});
export enum ResponseCodes {
  Success = 0,
  Error = 1,
  NeedCaptcha = 10
}
export interface ResponseWithErrors {
  resultCode: ResponseCodes
  messages: Array<string>
  data: Object
}
interface GetUsersResponse {
  items: Array<UserType>
  totalCount: number
  error: string|null
}

export const usersAPI = {
  async getUsers(currentPage:number, pageSize:number, username:string|undefined, friend: boolean|undefined) {
    
    let request = `users?page=${currentPage}&count=${pageSize}`
    if (username) request = `${request}&term=${username}`
    if(friend !==undefined) request = `${request}&friend=${friend}`
    const response = await Server.get<GetUsersResponse>(request);
    return response.data;
  },
  async follow(id:number) {
    const response = await Server.post<ResponseWithErrors>(`follow/${id}`);
    return response.data.resultCode;
  },
  async unfollow(id:number) {
    const response = await Server.delete<ResponseWithErrors>(`follow/${id}`);
    return response.data.resultCode;
  },
};

interface SavePhotoResponse extends ResponseWithErrors{
  photos: PhotosType|null
}

export const profileAPI = {
  async savePhoto(image:any) {
    const formData = new FormData();
    formData.append("image", image);
    const response = await Server.put<SavePhotoResponse>(`/profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  async getUserProfile(userId:number) {
    const response = await Server.get<ProfileType>(`profile/${userId}`);
    return response.data;
  },
  async getUserStatus(userId:number) {
    const response = await Server.get<string>(`profile/status/${userId}`);
    return response.data;
  },
  async setStatus(status:string) {
    const response = await Server.put<ResponseWithErrors>(`profile/status`, { status });
    return response.data;
  },
  async updateProfileData(profile:ProfileType) {
    const response = await Server.put<ResponseWithErrors>(`profile`, profile);
    return response.data;
  },
};

interface AuthMeResponse extends ResponseWithErrors{
  data: {
    id: number
    email: string
    login: string
  }
  fieldsError:Array<string>
}
type GetCaptchaUrlResponse = {
  url:string
}
export const authAPI = {
  async me() {
    const response = await Server.get<AuthMeResponse>("auth/me");
    return response.data;
  },
  async login(email:string, password:string, rememberMe:boolean, captcha:string) {
    const response = await Server.post<ResponseWithErrors>("auth/login", {
      email,
      password,
      rememberMe,
      captcha
    });
    return response.data;
  },
  async logout() {
    const response = await Server.delete<ResponseWithErrors>("auth/login");
    return response.data;
  },
  async getCaptchaUrl() {
    const response = await Server.get<GetCaptchaUrlResponse>(`security/get-captcha-url`);
    return response.data.url;
  },
};
