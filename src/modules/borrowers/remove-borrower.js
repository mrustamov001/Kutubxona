const { NotFoundError } = require("../../shared/errors");
const Borrower = require("./Borrower");

const removeBorrower = async ({ id }) => {
    const result = await Borrower.findById({ _id: id, is_deleted: false });

    if (!result) throw new NotFoundError(`Borrower ${id} not found`);

    return Borrower.findByIdAndUpdate(
        id,
        {
            is_deleted: true,
            phone: `${result.phone}_${Date.now()}_deleted`,
        },
        { new: true }
    ).select("-is_deleted");
};

module.exports = removeBorrower;
