const { NotFoundError } = require("../../shared/errors");
const Loan = require("./Loans");

const showLoan = async ({ id }) => {
    const result = await Loan.findById(id)
        .select()
        .populate({
            path: "book",
            select: "author publisher",
            populate: [
                {
                    path: "publisher",
                    select: "name",
                },
                {
                    path: "author",
                    select: "name",
                },
            ],
        })
        .populate("borrower", "full_name")
        .populate("admin", "full_name");

    if (!result) throw new NotFoundError(`Loan ${id} not found`);

    return result;
};

module.exports = showLoan;
