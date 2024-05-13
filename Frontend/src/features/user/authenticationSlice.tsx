import { createSlice } from '@reduxjs/toolkit';
import Cookie from "js-cookie";

const initialState = {
  userData: null,
  status:false,
};


const cookie = Cookie.get("user_info");

if (cookie) {
  const data = JSON.parse(cookie);
  initialState.status = data?.status;
  initialState.userData = data?.userData;
}


export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      Cookie.set(
        "user_info",
        JSON.stringify({ status: true, userData: action.payload }),
        {
          expires: 1,
        }
      );
    },
    setLogout: (state) => {
      state.status = false;
      state.userData = null;
      Cookie.set(
        "user_info",
        JSON.stringify({ status: false, userData: ""  }),
        {
          expires: 1,
        }
      );  
    },
  },
});

export const { setLogin , setLogout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
