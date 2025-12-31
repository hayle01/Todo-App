import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-8 h-8 border-4 border-transparent border-t-primary-400 rounded-full animate-spin"
            style={{
              animationDirection: "reverse",
              animationDuration: "0.5s",
            }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
