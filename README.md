This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the seed data script:
```bash
npm run seed:data
# or
yarn seed:data
```
Second. run the dev server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## APIs
GET `/api/v1/movies` - Returns a small set of movies from the DB.

GET `/api/v1/movies?search=<text>` - Returns a search result from Algolia.

POST `/api/v1/movies` - accepts a json body for movie, indexes it on Algolia, creates entry in db and returns the uuid.

PUT `/api/v1/movies/:uuid` - Replaces a movie from Algolia and db.

DELETE `/api/v1/movies/:uuid` - Deletes a movie from Algolia and db.
