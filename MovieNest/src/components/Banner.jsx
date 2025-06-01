import React from "react";

function Banner() {
  return (
    <div
      className="h-[80vh] mb-4 md:h-[87vh] bg-cover bg-centre flex items-end"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/jerrick/image/upload/v1569958025/5d93a8896f3dfe001ea64e94.jpg)",
      }}
    >
      <div className="text-white text-xl font-bold text-align-center flex justify-center w-full bg-gray-900/60 bg-opacity-50 p-4">
        Avengers Endgame
      </div>
    </div>
  );
}

export default Banner;
