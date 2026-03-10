## simple graphql implementation

simple GraphQL implementation to lean how to parse the thing.


The hiearchy of things
```
Client
|
Node.js/Express server - typical stuff
|
GraphQL endpoint (/graphql) - Interact with a post/get request to the server, queries get sent to resolver.
|
Resolvers - this is where we make the queries that interact with our DB
|
Database (Sqlite3/PostgreSQL/MongoDB) - GraphQL is DB agnostic since our resolvers do the work of parsing the requests.
```

### how to run
Implementation assumes sqlite3 is already installed.
Run `./db/load.sh` to load the temp data.

Uses Node v20+

```
npm install

npm run build

npm run start
```


### sample request
```
curl http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { books { title author { name } } }"}'
```