const { NotFoundError } = require("../../shared/errors");
const Admin = require("./Admin");

const showAdmin = async ({ id }) => {
    const result = await Admin.findById(id);

    if (!result) throw new NotFoundError(`Admin ${id} not found`);

    return result;
};

module.exports = showAdmin;
