import React from "react";

function SelectMovie({ movie, onClose }) {
  const genreDescriptions = {
    Action: "Explosive thrills, daring stunts, and non-stop excitement!",
    Comedy: "Get ready to laugh out loud with hilarious moments and jokes.",
    Drama: "A captivating journey of emotions and unforgettable stories.",
    Horror: "Prepare for spine-chilling suspense and hair-raising terror.",
    Romance: "Heartwarming tales of love, passion, and connections.",
    SciFi: "Explore futuristic worlds and mind-bending adventures.",
    Animation: "Wholesome stories with vibrant visuals for all ages.",
    Default: "An exciting cinematic experience awaits you!"
  };

  const genre = movie.genre_ids?.[0] || "Default";
  const overview = movie.overview || genreDescriptions[genre] || genreDescriptions.Default;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 h-[500px] w-[1000px] flex flex-row relative">
        <button
          className="absolute pr-2 top-2 right-2 text-3xl bold hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>

        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-1/3 rounded-lg object-cover"
        />

        <div className="w-2/3 pl-4 flex flex-col justify-around">
          <h1 className="text-center text-xl font-bold">{movie.title}</h1>
          <p className="justify-evenly text-gray-600 my-2 m-16">{overview}</p>

          <div className="flex justify-center gap-16 text-gray-800 my-2">
            <span><b>Rating:</b> {movie.vote_average}</span>
            <span><b>Popularity:</b> {movie.popularity}</span>
          </div>

          <div className=" flex justify-center text-sm text-gray-500 italic">
            Release Date: {movie.release_date}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectMovie;
