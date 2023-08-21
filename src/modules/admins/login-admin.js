const { compare } = require("bcryptjs");
const { UnauthorizedError } = require("../../shared/errors");
const Admin = require("./Admin");
const config = require("../../shared/config");
const jwt = require("jsonwebtoken");

const loginAdmin = async ({ username, password }) => {
    const existing = await Admin.findOne({ username });

    if (!existing)
        throw new UnauthorizedError(
            `Incorrect username ${username} and password ${password}`
        );

    const match = await compare(password, existing.password);
    if (!match)
        throw new UnauthorizedError(
            `Incorrect password ${password} and password ${match}`
        );

    const token = jwt.sign(
        { user: { id: existing._id, is_super: existing.is_super } },
        config.jwt.secret,
        { expiresIn: "1d" }
    );

    return token;
};

module.exports = loginAdmin;
