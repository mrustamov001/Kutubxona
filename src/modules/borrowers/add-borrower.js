const Borrower = require("./Borrower");

const addBorrower = async (data) => {
    const result = await Borrower.create(data);

    return result;
};

module.exports = addBorrower;
