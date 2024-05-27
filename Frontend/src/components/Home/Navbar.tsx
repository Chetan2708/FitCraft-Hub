import React from "react";
import logo from "../../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { Link as ScrollLink } from "react-scroll";
import WatchList from "../WatchList";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);

  return (
    <div className="flex justify-between">
      <div className="flex gap-10 items-center mt-4 text-3xl ">
        <img src={logo} alt="logo" className="p-4"/>
        <Link to="/">Home</Link>
        <ScrollLink
          to="exercises"
          smooth={true}
          duration={1500}
          className="cursor-pointer"
        >
          Exercises
        </ScrollLink>
        <Link to="/about">About</Link>
      </div>
      <div className="flex">
        {!user ? (
          <button
            className="bg-red-500 text-white px-10 p-4 rounded-lg mt-4 mr-4 hover:bg-red-400"
            onClick={() => navigate("/auth")}
          >
            Login
          </button>
        ) : (
          <ProfileModal />
        )}

        {
          user && <WatchList/>
        }
      </div>
    </div>
  );
};

export default Navbar;
