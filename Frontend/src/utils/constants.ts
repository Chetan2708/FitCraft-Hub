export  const exercisedburl = "https://exercisedb.p.rapidapi.com";
export const youtubeSearchUrl ="https://youtube-search-and-download.p.rapidapi.com";


export const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/v1"
    : "http://localhost:5000/api/v1";
