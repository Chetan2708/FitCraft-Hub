import React from "react";

import logo from "../../assets/images/Logo.png";
import { Link, useNavigate  } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar: React.FC  = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  
  
  return (
    <div className="flex justify-between " >
      <div className="flex gap-10 items-center mt-4 text-3xl">
        <img src={logo} alt="logo" />
        <Link to="/">Home</Link>
        <a href="#exercises">Exercises</a>
      </div>
      <div className="flex" >
        { !user ? 
        <button className="bg-red-500 text-white px-10 p-4 rounded-lg mt-4 mr-4 hover:bg-red-400"onClick={()=>navigate("/auth")}>
          Login
          </button> :
          'Profile'
        }

      </div>

    </div>
  );
};

export default Navbar;
