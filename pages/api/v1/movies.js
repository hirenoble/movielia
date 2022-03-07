import { getAllMovies, addSingleMovie } from "../../../db/movies";
import { addSingleMovieToIndex, deleteSingleMovieFromIndex, searchMovies } from "../../../search/movies";

const movies = async (req, res) => {
  if(req.method === "GET") {
    if(req.query.search && req.query.search !== "") {
      const movies = await searchMovies(req.query.search);
      res.json(movies.hits);
    }
    const movies = await getAllMovies();
    res.json(movies);
  } else if(req.method === "POST") {
    const movie = req.body;
    const uuid = require("uuid");
    const objectID = uuid.v4();
    if (movie.objectID && movie.objectID !== "") {
      movie.mObjectID = movie.objectID;
    }
    movie.objectID = objectID;
    const algoliaResult = await addSingleMovieToIndex(movie);
    if(!algoliaResult || !algoliaResult.objectID) {
      res.json({error: "error occurred while adding an index for this movie"});
    }
    const dbResult = await addSingleMovie(movie);
    if(!dbResult || !dbResult.acknowledged) {
      const rollback = await deleteSingleMovieFromIndex(objectID);
      res.json({error: "error occurred while adding movie to db"});
    }
    res.json({uuid: objectID})
  }
};

export default movies;
