import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import WatchList from "./components/WatchList";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [watchList, setWatchList] = useState([]); // Global state for watchlist
  const [isNightMode, setIsNightMode] = useState(false); // State to handle night mode

  // Function to toggle night mode
  const handleToggleNightMode = () => {
    setIsNightMode(prevMode => !prevMode);
  };

  const handleAddToWatchList = (movieObj) => {
    const newWatchList = [...watchList, movieObj];
    localStorage.setItem("watchList", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
  };

  const handleRemoveFromWatchList = (movieObj) => {
    const filteredWatchList = watchList.filter((movie) => movie.id !== movieObj.id);
    setWatchList(filteredWatchList);
    localStorage.setItem("watchList", JSON.stringify(filteredWatchList));
  };

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem("watchList");
    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    // Apply night mode or day mode class to body based on isNightMode
    if (isNightMode) {
      document.body.classList.add("night-mode");
      document.body.classList.remove("day-mode");
    } else {
      document.body.classList.add("day-mode");
      document.body.classList.remove("night-mode");
    }
  }, [isNightMode]);

  return (
    <BrowserRouter>
      <Navbar isNightMode={isNightMode} handleToggleNightMode={handleToggleNightMode} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies
                watchList={watchList}
                handleAddToWatchList={handleAddToWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
              />
            </>
          }
        />
        <Route
          path="/watchList"
          element={
            <WatchList
              watchList={watchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
            />
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
