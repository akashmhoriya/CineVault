import React, { useEffect, useState } from "react";
import _ from "lodash";

import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";
const MovieList = ({ type, title, emoji }) => {
  // useEffect(()=>{
  //   fetch("https://api.themoviedb.org/3/movie/popular?api_key=59152f22923f93d6fe1dab92ef433cdc")
  //   .then((res) => res.json())
  //   .then((data)=> console.log(data))
  // },[])  ---> one of the way you fetch the data
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });
  /* // useEffect(() => {
  //   fetchMovies();
  // }, []);

  // const fetchMovies = async () => {
  //   const response = await fetch(
  //     "https://api.themoviedb.org/3/movie/popular?api_key=59152f22923f93d6fe1dab92ef433cdc",
  //   );
  //   const data = await response.json();
  //   setMovies(data.results);
  // };*/
  useEffect(() => {
    const fetchMovies = async () => {
      let allMovies = [];

      for (let page = 1; page <= 3; page++) {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=59152f22923f93d6fe1dab92ef433cdc&page=${page}`,
        );
        const data = await res.json();
        // console.log(data);
        allMovies = [...allMovies, ...data.results];
      }

      setMovies(allMovies);
      setFilterMovies(allMovies);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setFilterMovies(sortedMovies);
    }
  }, [sort]);

  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };

  // const handleSort = e =>{
  //   const {name, value} = e.target;
  //   setSortBy(prev=>{
  //     return {...prev,[name]:value}
  //   })
  // }
  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(SortBy);

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title}{" "}
          <img src={emoji} alt={`${emoji} icon`} className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />

          <select
            name="by"
            id=""
            onChange={handleSort}
            value={sort.by}
            className="movie_sorting">
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>

          <select
            name="order"
            id=""
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
