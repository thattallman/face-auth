import React, {useState} from "react";
import Face from "./Face";
import Register from "./Register";


const AuthReg = () => {
  const [faceDiscriporRef,setFaceDiscriporRef] = useState(null);

  return (
    <>
      <div className="flex justify-between">
        <div className="w-1/2">
          <Face faceDiscriporRef = {faceDiscriporRef} setFaceDiscriporRef={setFaceDiscriporRef} />
        </div>
        <div className="border-l border-gray-700 h-screen"></div>
        <div className="w-1/2">
          <Register faceDiscriporRef ={faceDiscriporRef} />
        </div>
      </div>
    </>
  );
};

export default AuthReg;
