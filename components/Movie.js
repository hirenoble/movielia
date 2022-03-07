import React from "react";

const Movie = ({ movie }) => {
  return (
    <div className="movie">
      <h2>{movie.title}</h2>
      <div>
        <img
          width="200"
          alt={movie.title}
          src={movie.image}
        />
      </div>
      <p>Rating: {movie.rating} / Year: {movie.year}</p>
      <p>
        {movie.actors.slice(0,6).map((actor) => actor+", ")}
      </p>
    </div>
  );
};

export default Movie;
