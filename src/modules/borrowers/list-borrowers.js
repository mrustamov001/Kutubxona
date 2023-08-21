const Borrower = require("./Borrower");

const listBorrowers = async ({
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
    if (sort.by == "phone")
        sorting = sort.order == "asc" ? { phone: 1 } : { phone: -1 };

    const total = await Borrower.find();

    const result = await Borrower.find(filter)
        .sort(sorting)
        .skip((page.offset - 1) * page.limit)
        .limit(page.limit);

    return {
        list: result,
        pageInfo: { Total_Barrowers: total.length, ...page },
    };
};

module.exports = listBorrowers;
