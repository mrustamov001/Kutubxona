const { NotFoundError } = require("../../shared/errors");
const Author = require("./Author");

const removeAuthor = async ({ id }) => {
    const result = await Author.findById({ _id: id, is_deleted: false });

    if (!result) throw new NotFoundError(`Author ${id} not found`);

    return Author.findByIdAndUpdate(
        id,
        {
            is_deleted: true,
            name: `${result.name}_${Date.now()}_deleted`,
        },
        { new: true }
    ).select("-is_deleted");
};

module.exports = removeAuthor;
