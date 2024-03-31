import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-black text-white flex justify-between items-center px-4 py-2">
      <div className="flex items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/581/100/non_2x/biometric-person-identification-facial-recognition-concept-futuristic-low-polygonal-human-face-vector.jpg"
          className="w-12 h-12"
          alt="img"
        />
      </div>
      <ul className="flex items-center space-x-4">
        <Link to={"/"}>
          <li className="cursor-pointer">Registration</li>
        </Link>
        <Link to={"/login"}>
          <li className="cursor-pointer">Login(with Face Id)</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
