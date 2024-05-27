import { Outlet } from "react-router-dom";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useDispatch } from "react-redux";
import { getCurrentUser } from "../utils/api";
import { setLogin, setLogout } from "../features/user/authenticationSlice";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";


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
    <div >
      <Navbar />
      <main className="min-h-screen"> 
      <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
