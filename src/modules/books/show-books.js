const { NotFoundError } = require("../../shared/errors");
const Book = require("./Books");

const showBook = async ({ id }) => {
    const result = await Book.findById(id)
        .select()
        .populate("publisher", "name address phone")
        .populate("author", "name");

    if (!result) throw new NotFoundError(`Book ${id} not found`);

    return result;
};

module.exports = showBook;
