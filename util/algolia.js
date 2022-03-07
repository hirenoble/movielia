import algoliasearch from "algoliasearch";
let searchIndex = null;
let adminIndex = null;

export const connectAlgoliaSearch = async () => {
  if (!searchIndex) {
    const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
    const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
    const client = await algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
    searchIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);
  }
  return searchIndex;
};

export const connectAlgoliaAdmin = async () => {
  if (!adminIndex) {
    const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
    const ALGOLIA_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
    const client = await algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
    adminIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);
  }
  return adminIndex;
};