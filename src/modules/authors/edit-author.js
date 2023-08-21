const { NotFoundError } = require("../../shared/errors");
const Author = require("./Author");

const editAuthor = async ({ id, ...data }) => {
    const existing = await Author.findById(id);

    if (!existing) throw new NotFoundError(`Author ${id} not found`);

    return Author.findByIdAndUpdate(id, data, { new: true });
};

module.exports = editAuthor;
