import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Movie from "../components/Movie";
import Search from "../components/Search";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
    fetch('/api/v1/movies')
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse);
        setLoading(false);
      });
  }, []);

    const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`/api/v1/movies?search=${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse);
        setLoading(false);
      });
  	};
  return (
    <div className="App">
    <Header text="Movielia" />
    <Search search={search} />
    <div className="movies">
      {loading && !errorMessage ? (
       <span>loading...</span>
       ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        movies.map((movie, index) => (
          <Movie key={`${index}-${movie.Title}`} movie={movie} />
        ))
      )}
    </div>
  </div>
  )
}
