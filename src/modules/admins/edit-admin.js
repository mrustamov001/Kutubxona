const { NotFoundError } = require("../../shared/errors");
const Admin = require("./Admin");

const editAdmin = async ({ id, ...changes }) => {
    const existing = await Admin.findById(id);

    if (!existing) {
        throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    return Admin.findByIdAndUpdate(id, changes, { new: true });
};

module.exports = editAdmin;
