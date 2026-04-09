import React from "react";
import "./App.css";
import Fire from "./assets/fire.png";
import Star from "./assets/glowing-star.png";
import Party from "./assets/partying-face.png";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";
const App = () => {
  return (
    <div id="home" className="app">
      <Navbar />

      <main>
        <MovieList type="popular" title="Popular" emoji={Fire} />
        <MovieList type="top_rated" title="Top Rated" emoji={Star} />
        <MovieList type="upcoming" title="upcoming" emoji={Party} />
      </main>
    </div>
  );
};

export default App;
