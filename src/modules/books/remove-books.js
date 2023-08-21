const { NotFoundError } = require("../../shared/errors");
const Book = require("./Books");

const removeBook = async ({ id }) => {
    const result = await Book.findById({ _id: id, is_deleted: false });

    if (!result) throw new NotFoundError(`Book ${id} not found`);

    return Book.findByIdAndUpdate(
        id,
        {
            is_deleted: true,
            title: `${result.title}_${Date.now()}_deleted`,
        },
        { new: true }
    ).select("-is_deleted");
};

module.exports = removeBook;
