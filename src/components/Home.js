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

        // Drawing  custom elements or annotations
  
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
      }}
    >
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4 ">Welcome to FaceAuth</h1>
        <p className="text-xl ">Hello {userName}</p>
        <div className="flex flex-col items-center ">
          <video
            ref={videoRef}
            autoPlay
            muted
            className=" h-full  mb-4 border border-gray-300 my-7"
          ></video>
          <canvas ref={canvasRef} className="appcanvas " />
          <div>
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
