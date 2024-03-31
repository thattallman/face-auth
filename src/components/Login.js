import React, { useState } from "react";
import { TbFaceId } from "react-icons/tb";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = ({faceId}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
    .post("https://kdsbf0gjsa.execute-api.us-east-1.amazonaws.com/dev/login", {
      email,
      password,
    })
    .then(function (response) {
      if (response.data.valid) {
        toast.success("Login successful");
        navigate('/home');
      } else {
        toast.error("Invalid credentials");
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    setEmail("");
    setPassword("");

  };

  return (
    <div
      className="bg-cover min-h-screen flex justify-center items-center"
      style={{ backgroundImage: "url('https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1711497600&semt=ais')" }}
    >
      <div className="flex flex-col justify-center items-center w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <div className="flex justify-center items-center">
          <TbFaceId className="text-6xl" />
          <h1 className="text-6xl font-bold ml-2">FaceAuth</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col space-y-4">
          <div className="flex items-center">
            <label htmlFor="email" className="w-1/4 mr-2 text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              className="flex-grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="password"
              className="w-1/4 mr-2 text-sm font-medium"
            >
              Password:
            </label>
            <input
              type="password"
              className="flex-grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-center text-white bg-black rounded hover:bg-gray-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
