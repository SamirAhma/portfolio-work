import React from "react";

const LoadingImagePlaceholder = () => {
  return (
    <div className="relative w-full bg-gray-200 h-400 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full bg-gray-500 rounded-full h-400"></div>
      </div>
    </div>
  );
};

export default LoadingImagePlaceholder;
