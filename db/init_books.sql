-- remove tables if they exist
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER,
  FOREIGN KEY(author_id) REFERENCES authors(id)
);

INSERT INTO authors (id, name) VALUES
(1, 'George Orwell'),
(2, 'Jane Austen'),
(3, 'Mark Twain'),
(4, 'Mary Shelley'),
(5, 'Leo Tolstoy');

INSERT INTO books (id, title, author_id) VALUES
(1, '1984', 1),
(2, 'Animal Farm', 1),
(3, 'Pride and Prejudice', 2),
(4, 'Sense and Sensibility', 2),
(5, 'Adventures of Huckleberry Finn', 3),
(6, 'The Adventures of Tom Sawyer', 3),
(7, 'Frankenstein', 4),
(8, 'War and Peace', 5),
(9, 'Anna Karenina', 5);