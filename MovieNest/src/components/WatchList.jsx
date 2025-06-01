import React, { useEffect, useState } from 'react';
import genreids from '../utils/genre';

function WatchList({ watchList, handleRemoveFromWatchList, isNightMode }) {
  const [search, setSearch] = useState(''); // This allows users to search for movies
  const [genreList, setGenreList] = useState(['All Genres']); // Genres to filter movies by
  const [currGenre, setCurrGenre] = useState('All Genres'); // Current selected genre

  // Handle Search Input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle Genre Filter
  const handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  // Get unique genres from the watchlist on component mount
  useEffect(() => {
    let temp = watchList.map((movieObj) => genreids[movieObj.genre_ids[0]]);
    temp = new Set(temp);
    setGenreList(['All Genres', ...temp]);
  }, [watchList]);

  return (
    <>
      <div className={`flex justify-center flex-wrap m-4 ${isNightMode ? 'bg-gray-800 text-white' : ''}`}>
        {genreList.map((genre) => (
          <div
            onClick={() => handleFilter(genre)}
            className={`flex justify-center h-[3rem] w-[9rem] items-center rounded-xl font-bold mr-2 ${currGenre === genre ? (isNightMode ? 'bg-blue-600' : 'bg-blue-400') : 'bg-gray-400 opacity-50'}`}
          >
            {genre}
          </div>
        ))}
      </div>

      <div className='flex justify-center my-4'>
        <input
          onChange={handleSearch}
          value={search}
          type='text'
          className={`h-[3rem] w-[18rem] ${isNightMode ? 'bg-gray-700 text-white' : 'bg-gray-200'} outline-none px-2 rounded-3xl`}
          placeholder='Search movies'
        />
      </div>

      <div className={`overflow-hidden border rounded-xl m-4 ${isNightMode ? 'bg-gray-900 text-white' : ''}`}>
        <table className='w-full text-center'>
          <thead className={`border-b-2 ${isNightMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <tr>
              <th>Movie Name</th>
              <th>Ratings</th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchList
              .filter((movieObj) => {
                if (currGenre === 'All Genres') return true;
                return genreids[movieObj.genre_ids[0]] === currGenre;
              })
              .filter((movieObj) => movieObj.title.toLowerCase().includes(search.toLowerCase()))
              .map((movieObj) => (
                <tr className={`border-b-2 ${isNightMode ? 'border-gray-600' : 'border-gray-200'}`} key={movieObj.id}>
                  <td className='flex items-center py-4 px-6'>
                    <img
                      className='h-[25vh] w-[135px] bg-center bg-cover rounded-xl hover:scale-105 duration-300 hover:cursor-pointer relative'
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      alt={movieObj.title}
                    />
                    <div className='mx-10'>{movieObj.title}</div>
                  </td>
                  <td>{movieObj.vote_average}</td>
                  <td>{movieObj.popularity}</td>
                  <td>{genreids[movieObj.genre_ids[0]]}</td>
                  <td
                    onClick={() => handleRemoveFromWatchList(movieObj)}
                    className='text-red-700 cursor-pointer hover:text-red-500'
                  >
                    Remove
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
