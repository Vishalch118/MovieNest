import React, { useEffect } from "react";
import { useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";
import SelectMovie from "./SelectMovie";

function Movies({
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchList,
}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [selectMovie, setSelectMovie]= useState(null);

  const handlePrevious = () => {
    if (pageNo == 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handleSelectMovie=(movieObj)=>{
    setSelectMovie(movieObj);
  };

  const handleCloseSelectMovie=()=>{
    setSelectMovie(null);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=903c1f2f62a120277f680a5dab1bdc91&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results); //All data from the API will now be stored in setMovies, all results are different objects ,each has diff properties,
      });
  }, [pageNo]);

  return (
    <div className="p-2">
      <div className="text-center m-5 font-bold p-4 text-xl">
        Trending Movies
      </div>
      <div className="flex flex-row flex-wrap justify-around gap-8">
        {movies.map((movieObj) => {
          return (
            //returning MovieCard component for each movie in the movies array
            <MovieCard
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              handleAddToWatchList={handleAddToWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchList={watchList}
              handleSelectMovie={handleSelectMovie}
            />
          );
        })}
        {/* This will return the MovieCard component for each movie in the movies array */}
      </div>

      {selectMovie && (
        <SelectMovie
          movie={selectMovie}
          onClose={handleCloseSelectMovie}
        />
      )}

      <div>
        <Pagination
          pageNo={pageNo}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </div>
    </div>
  );
}

export default Movies;
