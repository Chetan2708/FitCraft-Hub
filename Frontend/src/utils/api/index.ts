import axios from "axios";
import { LoginType, SignUpType } from "../../definitions";



const baseURL =
    process.env.NODE_ENV === "production"
        ? "/api/v1"
        : "http://localhost:5000/api/v1";


// const API = axios.create({ baseURL: baseURL, withCredentials: true });


const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
    return {};
  };
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