import React from "react";

const AuthLoading = () => {
  return (
    <div className="min-h-screen absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-transparent ">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="relative ">
          <div className="top-0 left-0 w-20 h-20 relative rounded-full border-[9px] border-main border-r-transparent animate-spinReverse flex items-center justify-center"></div>
          <div className=" absolute    top-[16px] left-[16px] w-12 h-12 rounded-full border-[8px] border-main border-r-transparent animate-spinReverse1"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoading;
