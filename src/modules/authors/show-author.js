const { NotFoundError } = require("../../shared/errors");
const Author = require("./Author");

const showAuthor = async ({ id }) => {
    const result = await Author.findById(id);

    if (!result) throw new NotFoundError(`Author ${id} not found`);

    return result;
};

module.exports = showAuthor;
