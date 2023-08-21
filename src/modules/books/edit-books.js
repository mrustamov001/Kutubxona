const { NotFoundError } = require("../../shared/errors");
const Book = require("./Books");

const editBook = async ({ id, ...data }) => {
    const existing = await Book.findById(id);

    if (!existing) throw new NotFoundError(`Book ${id} not found`);

    return Book.findByIdAndUpdate(id, data, { new: true });
};

module.exports = editBook;
