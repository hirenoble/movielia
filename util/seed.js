const fs = require("fs");
const uuid = require("uuid");
const algoliasearch = require("algoliasearch");
const { MongoClient } = require("mongodb");
const { exit } = require("process");
require("dotenv").config();

async function seedDb() {
  let rawdata = fs.readFileSync("./movies.json");
  let movies = JSON.parse(rawdata);
  movies = movies.map((movie) => {
    if (movie.objectID && movie.objectID !== "") {
      movie.mObjectID = movie.objectID;
    }
    movie.objectID = uuid.v4();
    return movie;
  });
  console.log("objectIDs created.");

  const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
  const ALGOLIA_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
  const client = await algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const adminIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);
  const result = await adminIndex.saveObjects(movies);
  console.log("Algolia index created successfully.");

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;
  const dbClient = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = await dbClient.db(dbName);
  const res = await db.collection("movies").insertMany(movies);
  console.log("DB entries created successfully.");

  exit();
}

seedDb();
