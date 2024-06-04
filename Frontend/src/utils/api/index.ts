import axios , { AxiosResponse } from "axios";
import { LoginType, SignUpType } from "../../definitions";
import { baseURL } from "../constants";
import { getAuthHeaders } from "./options";


/* Sign In and Sign Up */
export const signIn = (login: LoginType) => axios.post(`${baseURL}/user/login`, login);
export const signUp = (signup: SignUpType) => axios.post(`${baseURL}/user/register`, signup);


//Current Logged In User
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${baseURL}/user/current-user`, getAuthHeaders());
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchData = async (url:string, options:object ) => {
  const response:AxiosResponse = await axios.get(url, options  );
  return response.data;
};

export const fetchPostData = async (url:string, data:object ) => {
  const response:AxiosResponse = await axios.post(url, data ,getAuthHeaders());
  return response.data;
};



export const fetchBackendData = async (url:string) => {
  const response = await axios.get(url, getAuthHeaders());
  return response.data.data;
};

