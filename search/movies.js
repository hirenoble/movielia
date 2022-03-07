import { connectAlgoliaSearch, connectAlgoliaAdmin } from "../util/algolia";

export const searchMovies = async (searchTerm) => {
  const searchIndex = await connectAlgoliaSearch();
  try {
    const res = searchIndex.search(searchTerm);
    return res;
  } catch(e) {
    console.log(e);
  }

}

export const addSingleMovieToIndex = async (movie) => {
  const adminIndex = await connectAlgoliaAdmin();
  try {
    const res = await adminIndex.saveObject(movie, {'autoGenerateObjectIDIfNotExist': true});
    return res;
  } catch(e) {
    console.log(e);
  }
};

export const deleteSingleMovieFromIndex = async (uuid) => {
  const adminIndex = await connectAlgoliaAdmin();
  try {
    const res = await adminIndex.deleteObject(uuid);
    return res;
  } catch(e) {
    console.log(e);
  }
};

export const updateSingleMovieToIndex = async (movie) => {
  const adminIndex = await connectAlgoliaAdmin();
  try {
    const res = await adminIndex.partialUpdateObject(movie);
    return res;
  } catch(e) {
    console.log(e);
  }
};
