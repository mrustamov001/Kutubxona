const { NotFoundError } = require("../../shared/errors");
const Admin = require("./Admin");

const removeAdmin = async ({ id }) => {
    const result = await Admin.findById({ _id: id, is_deleted: false });

    if (!result) throw new NotFoundError(`Admin ${id} not found`);

    return Admin.findByIdAndUpdate(
        id,
        {
            is_deleted: true,
            username: `${result.username}_${Date.now()}_deleted`,
        },
        { new: true }
    ).select("-password -is_deleted");
};

module.exports = removeAdmin;
