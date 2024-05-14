import { Outlet } from "react-router-dom";
import Footer from "./components/Home/Footer";
import Navbar from "./components/Home/Navbar";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "./utils/api";
import { useDispatch } from "react-redux";
import { setLogin, setLogout } from "./features/user/authenticationSlice";

//       {/* <Route path="/exercise/:id" element={<Excercisedetails/>} /> */}

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const {error, data } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity, 
  });
  if (data) {
    dispatch(setLogin(data.user));
  }
  if (error) {
    dispatch(setLogout())
  }
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
