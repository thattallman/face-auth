import React from "react";

const Nav = () => {
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
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Services</li>
        <li className="cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
};

export default Nav;
