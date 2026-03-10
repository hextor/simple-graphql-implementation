import sqlite3 from "sqlite3";
import DataLoader from "dataloader";
import { buildSchema } from "graphql";

sqlite3.verbose();

// its for demo purposes !
export const db = new sqlite3.Database("./db/books.db");


export const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: Author
  }
  type Author {
    id: ID!
    name: String!
  }
  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`);

function batchAuthors(ids: readonly number[]): any {
  return new Promise((resolve, reject) => {
    const placeholders = ids.map(() => "?").join(",");
    db.all(
      `SELECT id, name FROM authors WHERE id IN (${placeholders})`,
      ids,
      (err, rows) => {
        if (err) return reject(err);
        const map = new Map(rows.map((r: any) => [r.id, r]));
        resolve(ids.map((id) => map.get(id)));
      }
    );
  });
}

const resolveBooks = (_: any, { loaders }: any): Promise<any[]> =>
  new Promise((resolve, reject) => {
    db.all("SELECT id, title, author_id FROM books", (err, rows) => {
      if (err) return reject(err);
      resolve(
        (rows as any[]).map((book: any) => ({
          ...book,
          author: () => loaders.authorLoader.load(book.author_id),
        }))
      );
    });
  });

// since this request will run multiple queries if there are multiple authors, we need to batch them so we can reduce it to a single query
const resolveBook = ({ id }: { id: string }, { loaders }: any): Promise<any> =>
  new Promise((resolve, reject) => {
    db.get(
      "SELECT id, title, author_id FROM books WHERE id = ?",
      [id],
      (err, row: any) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        resolve({
          ...row,
          author: () => loaders.authorLoader.load(row.author_id),
        });
      }
    );
  });

export function createLoaders() {
  return {
    authorLoader: new DataLoader(batchAuthors),
  };
}

export const resolvers = {
  books: resolveBooks,
  book: resolveBook,
};