import React, {useState} from "react";
import Face2 from "./Face2";
import Login from "./Login";

const AuthLogin = ({setAuth,setUserName}) => {
  const [faceId, setFaceId] = useState(null)
  return (
    <>
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <Face2  faceId={faceId} setFaceId={setFaceId} setAuth={setAuth} setUserName={setUserName}/>
      </div>

      <div className="border-t border-gray-700 md:border-t-0 md:border-l md:border-gray-700 w-full md:w-1/2">
        <Login  faceId= {faceId}/>
      </div>
    </div>
  </>
  );
};

export default AuthLogin;
