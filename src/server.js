require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5001;

const Book = require("./books/model");
const bookRouter = require("./books/routes");
const Genre = require("./genre/model");
const genreRouter = require("./genre/routes");
const Author = require("./authors/model");
const authorRouter = require("./authors/routes");

const app = express();
app.use(express.json());

const syncTables = () => {
    // Author can have many books
    Author.hasMany(Book);
    // Many books can belong to a single author
    Book.belongsTo(Author);

    Book.hasOne(Genre);
    Genre.hasMany(Book);

    Genre.sync();
    Book.sync();
    Author.sync();
    // {alter: true} to update tables if model was changed? RR
};

app.use(bookRouter,
    authorRouter,
    genreRouter
    );

app.use("/health", (req, res) => 
    res.status(200).json({message: "API is working"})
);

app.listen(port, () => {
    syncTables();
    console.log(`Server is listening on port ${port}`);
});