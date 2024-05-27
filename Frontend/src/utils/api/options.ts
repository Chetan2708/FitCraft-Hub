
export const exerciseApiOptions: RequestInit = {
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_X_RapidAPI_Key,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};


export const youtubeOptions: RequestInit = {
  headers: {
    "content-type": "application/octet-stream",
    "X-RapidAPI-Key": import.meta.env.VITE_X_RapidAPI_Youtube_Key, 
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com", 
  },
};


export const formdataOptions: RequestInit = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};


export const getAuthHeaders = () => {
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