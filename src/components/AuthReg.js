import React, { useState } from "react";
import Face from "./Face";
import Register from "./Register";

const AuthReg = () => {
  const [faceDiscriporRef, setFaceDiscriporRef] = useState(null);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Face
            faceDiscriporRef={faceDiscriporRef}
            setFaceDiscriporRef={setFaceDiscriporRef}
          />
        </div>
        <div className="border-t border-gray-700 md:border-t-0 md:border-l md:border-gray-700 w-full md:w-1/2">
          <Register faceDiscriporRef={faceDiscriporRef} />
        </div>
      </div>
    </>
  );
};

export default AuthReg;
