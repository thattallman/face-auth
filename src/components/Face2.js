import React, { useRef, useEffect ,useState} from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  LineWave} from 'react-loader-spinner'
import {REACT_APP_SERVER_URL} from '../utils'
const Face2 = ({  setUserName,setAuth  }) => {
  const [faceDetected, setFaceDetected] = useState(false);
  const videoRef = useRef();
  const mediaStreamRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    startVideo();
  }, []);

  // function to start the video
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        // set the reference to the currentStream of the camera
        videoRef.current.srcObject = currentStream;
        mediaStreamRef.current = currentStream;

        videoRef.current.onloadedmetadata = () => {
          // call the face detection function
          faceMyDetect();
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let faceDetectInterval;

  const faceMyDetect = () => {
    faceDetectInterval = setInterval(async () => {
    
  


      // identifying the live feeed of the camera 
      let detection = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detection && Array.isArray(detection) && detection.length > 0 && detection[0]?.descriptor) {
       
        // getting the information of all the labeled faced from the database 
        axios
          .get(REACT_APP_SERVER_URL+ '/faceAuth')
          .then((response) => {
            if (response.data.length > 0) {

              const arrayData = response.data.map((json) =>
                faceapi.LabeledFaceDescriptors.fromJSON(json)
              );
              // initiating the face matcher 
              const faceMatcher = new faceapi.FaceMatcher(arrayData);
              const result = faceMatcher.findBestMatch(detection[0].descriptor);

              // if the face is precent in the database 
              if (result._label !== "unknown") {
                clearInterval(faceDetectInterval);
                setUserName(result._label);
                setAuth(true);
                toast.success(`Welcome ${result._label}`);
                navigate("/home");
              } else {
                setFaceDetected(true)
                toast.warning("Unknown person detrected");
              }
            }else{
              toast.info("Datavase is empty ")

            }
          })
          .catch((error) => console.log(error));
      }
    }, 500);
  };

  return (
    <div className="mt-16">
      <div className="flex flex-col items-center ">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-4/5 h-96 mb-4 border border-gray-300 my-7"
        ></video>
         {!faceDetected && (
           
           (<LineWave
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
            />)
        )}
          Detecting faces, please wait...
      </div>
    </div>
  );
};
export default Face2;
