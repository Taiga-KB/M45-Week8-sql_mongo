require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5001;

const Book = require("./books/model");
const bookRouter = require("./books/routes");
const Author = require("./authors/model");
const authorRouter = require("./authors/routes");

const app = express();
app.use(express.json());

const syncTables = () => {
    Author.hasMany(Book);
    Book.belongsTo(Author);
    Book.sync();
    Author.sync();
    // {alter: true} to update tables if model was changed?
};

app.use(bookRouter,
    authorRouter
    );

app.use("/health", (req, res) => 
    res.status(200).json({message: "API is working"})
);

app.listen(port, () => {
    syncTables();
    console.log(`Server is listening on port ${port}`);
});