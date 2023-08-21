const { NotFoundError } = require("../../shared/errors");
const Borrower = require("./Borrower");

const showBorrower = async ({ id }) => {
    const result = await Borrower.findById(id);

    if (!result) throw new NotFoundError(`Borrowers ${id} not found`);

    return result;
};

module.exports = showBorrower;
