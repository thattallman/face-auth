import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Link, useNavigate } from "react-router-dom";
import image from "../background.jpg";

const Home = ({ auth, userName }) => {
  const videoRef = useRef();
  const mediaStreamRef = useRef(null);
  const navigate = useNavigate();
  const canvasRef = useRef();

  useEffect(() => {
    startVideo();
    if (auth === false) navigate("/login");
  }, []);

  useEffect(() => {
    startVideo();
    if (auth === false) navigate("/login");

    // Clean up function to clear interval and release resources
    return () => {
      clearInterval(faceDetectInterval);

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        // set the reference to the currentStream of the camera
        videoRef.current.srcObject = currentStream;
        mediaStreamRef.current = currentStream;
        // Set canvas dimensions to match video element's width and height
        videoRef.current.onloadedmetadata = () => {
          positionCanvas();
          // call the face detection function
          faceMyDetect();
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const positionCanvas = () => {
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    canvasRef.current.style.position = "absolute";
    canvasRef.current.style.top = videoRef.current.offsetTop;
    canvasRef.current.style.left = videoRef.current.offsetLeft;
  };

  let faceDetectInterval;
  const faceMyDetect = () => {
    // calling an interval after every second
    faceDetectInterval = setInterval(async () => {
      if (!videoRef.current) return;
      if (!canvasRef.current) return;
      // loading the present feed in the model
      let detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      // clearing the canvas
      if (!canvasRef.current) return;
      const context = canvasRef.current.getContext("2d");
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      //recizing the processed video
      detections = await faceapi.resizeResults(detections, {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      });

      // drawing on the canvas
      faceapi.draw.drawDetections(canvasRef.current, detections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, detections);

      detections.forEach((detection) => {
        const landmarks = detection.landmarks;
        faceapi.draw.drawFaceLandmarks(canvasRef.current, landmarks, {
          drawLines: true,
          color: "blue",
        });

        // Draw custom elements or annotations
        // Example: Draw a rectangle around the face
        const box = detection.detection.box;
        context.beginPath();
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.rect(box.x, box.y, box.width, box.height);
        context.stroke();
      });
    }, 500);
  };

  return (
    <div
      className="bg-cover min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${image})`,
        flexDirection: "column", // Change flex direction to column for mobile
        padding: "20px", // Add padding for better spacing on mobile
      }}
    >
      <div className="text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 ">
          Welcome to FaceAuth
        </h1>{" "}
        {/* Adjust font size for mobile */}
        <p className="text-lg md:text-xl ">Hello {userName}</p>{" "}
        {/* Adjust font size for mobile */}
        <div className="flex flex-col items-center mt-4">
          {" "}
          {/* Add margin top for better spacing */}
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full mb-4 border border-gray-300" // Make the video width full for mobile
            style={{ maxWidth: "300px" }} // Limit video width on larger screens
          ></video>
          <canvas ref={canvasRef} className="appcanvas w-full" />{" "}
          {/* Make the canvas width full for mobile */}
          <div className="mt-4">
            <Link
              to="/match"
              className="inline-block bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Try Face Matcher
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
