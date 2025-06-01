import React from "react";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchList,
  handleSelectMovie,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[40vh] w-[180px] bg-center bg-cover rounded-2xl hover:scale-105 duration-300 hover:cursor-pointer relative group"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})`,
      }}
      onClick={()=>{handleSelectMovie(movieObj)}}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFromWatchList(movieObj)}
          }
          className="absolute top-2 right-2 bg-white/30 text-white flex justify-center h-8 w-8 items-center rounded-lg opacity-0 group-hover:opacity-100 duration-300"
        >
          &#10060;  
        </div>
      ) : (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleAddToWatchList(movieObj)}
          }
          className="absolute top-2 right-2 bg-white/30 text-white flex justify-center h-8 w-8 items-center rounded-lg opacity-0 group-hover:opacity-100 duration-300"
        >
          &#9989;
        </div>
      )}

      <div className="absolute bottom-0 text-white text-xl w-full p-2 text-center bg-gray-900/60 rounded-b-2xl">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
