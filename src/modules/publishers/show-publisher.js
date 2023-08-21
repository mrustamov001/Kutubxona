const { NotFoundError } = require("../../shared/errors");
const Publisher = require("./Publisher");

const showPublisher = async ({ id }) => {
    const result = await Publisher.findById(id);

    if (!result) throw new NotFoundError(`Publisher ${id} not found`);

    return result;
};

module.exports = showPublisher;
