import { updateSingleMovie, deleteSingleMovie } from "../../../../db/movies";
import { updateSingleMovieToIndex, deleteSingleMovieFromIndex } from "../../../../search/movies";

const uuidOps = async (req, res) => {

  if(req.method === "PUT") {
    const uuid = req.query.uuid;
    const movie = req.body;
    movie.objectID = uuid;

    const algoliaResult = await updateSingleMovieToIndex(movie);
    console.log(algoliaResult);
    const dbResult = await updateSingleMovie(movie);
    console.log(dbResult);
    res.json({status: "success"});
  } else if(req.method === "DELETE") {
    const uuid = req.query.uuid;
    const algoliaResult = await deleteSingleMovieFromIndex(uuid);
    console.log(algoliaResult);
    const dbResult = await deleteSingleMovie(uuid);
    console.log(dbResult);
    res.json({status: "success"});
  }

}

export default uuidOps;