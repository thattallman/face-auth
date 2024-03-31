import React, {useState} from "react";
import Face2 from "./Face2";
import Login from "./Login";

const AuthLogin = ({setAuth,setUserName}) => {
  const [faceId, setFaceId] = useState(null)
  return (
    <>
    <div className="flex justify-between">
      <div className="w-1/2">
        <Face2  faceId={faceId} setFaceId={setFaceId} setAuth={setAuth} setUserName={setUserName}/>
      </div>
      <div className="border-l border-gray-700 h-screen"></div>
      <div className="w-1/2">
        <Login  faceId= {faceId}/>
      </div>
    </div>
  </>
  );
};

export default AuthLogin;
