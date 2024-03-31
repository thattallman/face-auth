import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import { Link } from "react-router-dom";
import image from "../background.jpg";

const FaceMatch = ({ auth }) => {
  const navigate = useNavigate();
  const [showMatchButton, setShowMatchButton] = useState(false);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (auth === false) navigate("/login");
  }, []);

  useEffect(() => {
    setShowMatchButton(image1 !== null && image2 !== null);
  }, [image1, image2]);

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const match = async () => {
    setSpinner(true);

    // getting the first page 
    const face1 = document.getElementById("imageLeft");

    // loading it into the model
    let leftFace = await faceapi
      .detectAllFaces(face1, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (!leftFace.length) {
      toast.error("left face not recogonized ", {
        position: "top-center",
      });

      setSpinner(false);
      return;
    }

    const faceDescriptors = leftFace.map((face) => face.descriptor);
    //initiating the FaceMatcher from the description 
    const faceMatcher = new faceapi.FaceMatcher(faceDescriptors);
   // getting the second image 
    const face2 = document.getElementById("imageRight");
     // loading it into the model 
    let rightFace = await faceapi
      .detectAllFaces(face2, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (
      rightFace &&
      Array.isArray(rightFace) &&
      rightFace.length > 0 &&
      rightFace[0]?.descriptor
    ) {
      const bestMatch = faceMatcher.findBestMatch(rightFace[0].descriptor);
        // if the face matches conditions 
      if (bestMatch._label === "unknown") {
        setSpinner(false);
        toast.error("Face did not match ", {
          position: "top-center",
        });
      } else {
        setSpinner(false);
        toast.success("Face Matched", {
          position: "top-center",
        });
      }
    } else {
      setSpinner(false);
      toast.error("right face not recogonized ", {
        position: "top-center",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-gray-400 bg-opacity-50 p-4 md:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-4xl mb-4 md:mb-8 text-center">
          Face Matcher
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center mb-4 md:mb-8">
          <div className="mr-0 md:mr-4 mb-4 md:mb-0">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setImage1)}
              className="mb-2 md:mb-4"
            />
            {image1 && (
              <img
                src={image1}
                alt="Uploaded Image 1"
                className="h-40 md:h-64 mb-2 md:mb-4 border border-gray-300"
                id="imageLeft"
              />
            )}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setImage2)}
              className="mb-2 md:mb-4"
            />
            {image2 && (
              <img
                src={image2}
                alt="Uploaded Image 2"
                className="h-40 md:h-64 mb-2 md:mb-4 border border-gray-300"
                id="imageRight"
              />
            )}
          </div>
        </div>

        <div className="text-center">
          {showMatchButton && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 md:mb-4"
              onClick={match}
            >
              Match
            </button>
          )}
          <div className="flex justify-center items-center">
            {spinner && <LineWave />}
            <Link
              to="/home"
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-4 md:mt-0 md:mr-10"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceMatch;
