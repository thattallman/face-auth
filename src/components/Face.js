import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
const Face = ({ faceDiscriporRef, setFaceDiscriporRef }) => {
  const [imageSrc, setImageSrc] = useState();
  const videoRef = useRef();
  const canvasRef = useRef();
  const mediaStreamRef = useRef(null);

  // loading the madels after the page is loaded
  // useEffect(() => {
  //   loadModels();
  // }, []);

  // function to start the video
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

  // function to stop the camera
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }
  };

  // function to caputure the image and stop the camera and the model interval
  const captureImage = async () => {
    clearInterval(faceDetectInterval);
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    let detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withFaceExpressions();
    detections = await faceapi.resizeResults(detections, {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    });
    faceapi.draw.drawDetections(canvas, detections);
    faceapi.draw.drawFaceExpressions(canvas, detections);
    const faceDescriptors = detections.map((face) => face.descriptor);


    setFaceDiscriporRef(faceDescriptors);
   
    const capturedImage = canvas.toDataURL("image/png");
    setImageSrc(capturedImage);
    stopCamera();
  };

  // trigger retake
  const retakeImage = () => {
    setImageSrc(null);
    setFaceDiscriporRef(null);
  };

  // for loading the models requried
  // const loadModels = () => {
  //   Promise.all([
  //     faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  //     faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  //     faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  //     faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  //   ]);
  // };

  let faceDetectInterval;
  const faceMyDetect = () => {
    // calling an interval after every second
    faceDetectInterval = setInterval(async () => {
      // loading the present feed in the model
      let detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      // clearing the canvas
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
    }, 500);
  };

  return (
    <div className="mt-16">
      {imageSrc ? (
        <div className="flex flex-col items-center">
          <img
            src={imageSrc}
            alt="Captured"
            className="w-3/5 h-96 mb-4 border border-gray-300 my-7"
          />
          <div>
            <button
              onClick={retakeImage}
              className="bg-black text-white px-4 py-2 mr-2"
            >
              Retake Image
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center ">
          <button
            onClick={startVideo}
            className="bg-black text-white px-4 py-2 mt-8"
          >
            Start Camera
          </button>
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-4/5 h-96 mb-4 border border-gray-300 my-7"
          ></video>

          <button
            onClick={captureImage}
            className="bg-black text-white px-4 py-2 mr-2 my-3"
          >
            Capture Image
          </button>
          <canvas ref={canvasRef} className="appcanvas " />
        </div>
      )}
    </div>
  );
};
export default Face;
