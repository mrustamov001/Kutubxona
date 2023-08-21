const Admin = require("./Admin");

const listAdmins = async ({
    q,
    page = { limit: 5, offset: 1 },
    sort = { by: "", order: "desc" },
    filters,
}) => {
    let filter = {};
    let sorting = {};

    if (q) filter.full_name = { $regex: new RegExp(q, "i") };
    if (filters) filter = filters;
    if (sort.by == "full_name")
        sorting = sort.order == "asc" ? { full_name: 1 } : { full_name: -1 };
    if (sort.by == "username")
        sorting = sort.order == "asc" ? { username: 1 } : { username: -1 };

    const total = await Admin.find();

    const admin = await Admin.find(filter)
        .sort(sorting)
        .skip((page.offset - 1) * page.limit)
        .limit(page.limit)
        .select("-password");

    return { list: admin, pageInfo: { Total_Admins: total.length, ...page } };
};

module.exports = listAdmins;
