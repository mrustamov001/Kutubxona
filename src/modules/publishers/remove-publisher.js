const { NotFoundError } = require("../../shared/errors");
const Publisher = require("./Publisher");

const removePublisher = async ({ id }) => {
    const result = await Publisher.findById({ _id: id, is_deleted: false });

    if (!result) throw new NotFoundError(`Publisher ${id} not found`);

    return Publisher.findByIdAndUpdate(
        id,
        {
            is_deleted: true,
            phone: `${result.phone}_${Date.now()}_deleted`,
        },
        { new: true }
    ).select("-is_deleted");
};

module.exports = removePublisher;
