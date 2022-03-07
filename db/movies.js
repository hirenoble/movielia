import { connectToDatabase } from "../util/mongodb";
export const getAllMovies = async () => {
  const { db } = await connectToDatabase();
  const movies = await db.collection("movies")
    .find({})
    .limit(100)
    .toArray();
  return movies;
};

export const addSingleMovie = async (movie) => {
  const { db } = await connectToDatabase();
  const result = await db.collection("movies").insertOne(movie);
  return result;
};

export const deleteSingleMovie = async (uuid) => {
  const { db } = await connectToDatabase();
  const query = { objectID: uuid };
  const result = await db.collection("movies").deleteOne(query);
  return result;
};

export const updateSingleMovie = async (movie) => {
  const { db } = await connectToDatabase();
  const result = await db.collection("movies").replaceOne({objectID: movie.objectID}, movie);
  return result;
}
