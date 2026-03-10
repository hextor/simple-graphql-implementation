import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';

import * as Book from './book.js';
 
const app = express();
 
// create graphql handlers
// allowing both POST and GET requests
app.all(
  '/graphql',
  createHandler({
    schema: Book.schema, // schema of my DB for my resolvers
    rootValue: Book.resolvers, // these are where my 'resolvers' live
    context: () => {
      return {
        loaders: Book.createLoaders() // loaders to help with batching data
      }
    }
  })
)
 
app.listen(8080);
console.log('Running at http://localhost:8080/graphql');
 