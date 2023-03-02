const {Router} = require("express");

const bookRouter = Router();

const {addBook} = require("./controllers");
const {getAllBooks} = require("./controllers");
const {getSingleBookByTitle} = require("./controllers")
const {updateBook} = require("./controllers");
const {deleteBook} = require("./controllers");
const {deleteAllBooks} = require("./controllers");


bookRouter.post("/books/addbook", addBook);
bookRouter.get("/books/getallbooks", getAllBooks);
bookRouter.get("/books/getbook/:title", getSingleBookByTitle)
bookRouter.put("/books/updatebook", updateBook);
bookRouter.delete("/books/deletebook", deleteBook);
bookRouter.delete("/books/deleteallbooks", deleteAllBooks);

module.exports = bookRouter;