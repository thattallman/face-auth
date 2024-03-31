import "./App.css";
import Navbar from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import AuthReg from "./components/AuthReg";
import AuthLogin from "./components/AuthLogin";
import * as faceapi from "face-api.js";
import { useEffect,useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [userName,setUserName]  = useState(null);
  const [auth,setAuth]  = useState(false);

  useEffect(() => {
    // Load models when the component mounts
    loadModels();
  }, []);

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]);
    setModelsLoaded(true);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <ToastContainer />
        {modelsLoaded ? (
          <Routes>
            <Route path="/" element={<AuthReg  />} />
            <Route path="/login" element={<AuthLogin setAuth={setAuth} setUserName={setUserName}  />} />
            <Route path="/home" element={<Home auth={auth} userName={userName}/>} />
          </Routes>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
