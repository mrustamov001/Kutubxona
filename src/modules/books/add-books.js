const Book = require("./Books");

const addBook = async (data) => {
    const result = await Book.create(data);

    return result;
};

module.exports = addBook;
