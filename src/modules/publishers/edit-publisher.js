const { NotFoundError } = require("../../shared/errors");
const Publisher = require("./Publisher");

const editPublisher = async ({ id, ...data }) => {
    const existing = await Publisher.findById(id);

    if (!existing) throw new NotFoundError(`Publisher ${id} not found`);

    return Publisher.findByIdAndUpdate(id, data, { new: true });
};

module.exports = editPublisher;
