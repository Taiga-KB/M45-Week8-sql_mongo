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
    // NO 1824
    Author.hasMany(Book);
    Book.belongsTo(Author);
    
    Genre.hasMany(Book);
    Book.belongsTo(Genre);
    
    Book.sync();
    Author.sync();
    Genre.sync();
// {alter: true} to update tables/model after initial creation
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

// =====ERRORS=====
// ERROR NO 1824: The order in which the syncTables load, the relationships should come first. 
// This should generate the relationship ID keys in the database, then create the tables with those added keys. 
// ERROR NO 1054: "Unknown column 'AuthorId' in 'field list". 
// Check keys in body are referenced correctly. If database is reset and new entries added
// the generated ID keys may change or refer to below you silly muppet.