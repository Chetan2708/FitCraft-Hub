import React, { useState } from "react";
import logo from "../../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { Link as ScrollLink } from "react-scroll";
import NavbarButton from "../../utils/extras/NavbarButton";
import Sidebar from "./Sidebar"; // Make sure to adjust the import path accordingly

const Navbar :React.FC =  () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState(false);
  const toggleSidebar = () => {
    setActive((prev) => !prev);
    setSidebarOpen((prev) => !prev)
  };

  return (
    <div className="flex sm:justify-between justify-end">
      <div className="sm:flex gap-10 items-center mt-4 text-3xl hidden">
        <img src={logo} alt="logo" className="p-4" />
        <Link to="/">Home</Link>
        <ScrollLink to="exercises" smooth={true} duration={1500} className="cursor-pointer">
          Exercises
        </ScrollLink>
      </div>

      <div className="flex">
        <div>
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
        </div>
        <div className="sm:hidden block">
          <NavbarButton isActive={active} onClick={toggleSidebar} />
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen}>
        <li className="mb-4">
          <Link to="/" onClick={toggleSidebar}>
            Home
          </Link>
        </li>
        <li className="mb-4">
          <ScrollLink to="exercises" smooth={true} duration={1500} className="cursor-pointer" onClick={toggleSidebar}>
            Exercises
          </ScrollLink>
        </li>
      </Sidebar>
    </div>
  );
};

export default Navbar;
