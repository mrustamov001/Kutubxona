const express = require("express");
const db = require("./db");
const handleError = require("./shared/errors/handle");
const config = require("./shared/config");
const adminRouter = require("./modules/admins/_api");
const borrowerRouter = require("./modules/borrowers/_api");
const publisherRouter = require("./modules/publishers/_api");
const authorRouter = require("./modules/authors/_api");
const bookRouter = require("./modules/books/_api");
const loanRouter = require("./modules/loans/_api");

const app = express();

app.use(express.json());

app.use(adminRouter);
app.use(borrowerRouter);
app.use(publisherRouter);
app.use(authorRouter);
app.use(bookRouter);
app.use(loanRouter);

app.use(handleError);

db();
app.listen(config.port, () => {
    console.log(`listening on http://${config.db.host}:${config.port}`);
});
