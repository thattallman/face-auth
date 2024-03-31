import * as faceapi from "face-api.js";
import React, { useState, useEffect } from "react";
import { TbFaceId } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const loadModels = () => {
//   Promise.all([
//     // faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//     // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//     // faceapi.nets.faceExpressionNet.loadFromUri("/models"),
//   ]);
// };

const Register = ({ faceDiscriporRef }) => {
  useEffect(() => {
    // loadModels();
  });

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const handleCheck = () => {
    if (faceDiscriporRef == null) {
      toast.error("Face ID not set ");
      return;
    }
  };

  const handleSubmit = () => {
    if (faceDiscriporRef == null) {
      toast.error("Face ID not set. Please try again.");
      return;
    }
    const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(
      firstName,
      faceDiscriporRef
    );
    const serialized = labeledFaceDescriptors.toJSON();
    console.log(serialized);

   

    axios
      .post("https://kdsbf0gjsa.execute-api.us-east-1.amazonaws.com/dev/register", {
        firstName,
        lastName,
        password,
        email,
        phoneNumber: number,
        faceDescriptor:serialized,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setNumber("");
    navigate("/login");
    toast.success("Successfully Registered ");
  };
  return (
    <div
      className="bg-cover min-h-screen flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1711497600&semt=ais')",
      }}
    >
      <div className="flex flex-col justify-center items-center w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <div className="flex justify-center items-center h-52">
          <TbFaceId className="text-6xl" />
          <h1 className="text-6xl font-bold ">FaceAuth</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-5 ">
          <div className="flex items-center">
            <label
              htmlFor="firstName"
              className="w-1/4 mr-2 text-sm font-medium"
            >
              First Name:
            </label>
            <input
              type="text"
              className="flex-grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="lastName"
              className="w-1/4 mr-2 text-sm font-medium"
            >
              Last Name:
            </label>
            <input
              type="text"
              className="flex-grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          <div className="flex items-center">
            <label htmlFor="number" className="w-1/4 mr-2 text-sm font-medium">
              Phone Number:
            </label>
            <input
              type="tel"
              className="flex-grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="faceDescriptor"
              className="w-1/4 mr-2 text-sm font-medium"
            >
              Face Id Recorded :
            </label>
            <label
              id="faceDescriptor"
              rows={1}
              className="flex-grow px-3 py-2 rounded border border-gray-300
              focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {faceDiscriporRef ? "true" : "false"}
            </label>
          </div>

          <button
            className="w-full py-2 text-center text-white bg-black rounded hover:bg-gray-700"
            type="submit"
            onMouseEnter={handleCheck}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
