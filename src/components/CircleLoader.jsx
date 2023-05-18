import React from "react";

const CircleLoader = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    border: "5px solid #f3f3f3",
                    borderTop: "5px solid #3498db",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    animation: "spin 2s linear infinite"
                }}
            ></div>
            <style>
                {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
            </style>
        </div>
    );
};

export default CircleLoader;
