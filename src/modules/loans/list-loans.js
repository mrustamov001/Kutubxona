const Loan = require("./Loans");

const listLoans = async ({
    page = { limit: 5, offset: 1 },
    sort = { by: "", order: "desc" },
    filters,
}) => {
    let filter = {};
    let sorting = {};

    if (filters) filter = filters;
    if (sort.by == "out_date")
        sorting = sort.order == "asc" ? { out_date: 1 } : { out_date: -1 };
    if (sort.by == "due_date")
        sorting = sort.order == "asc" ? { due_date: 1 } : { due_date: -1 };

    const total = await Loan.find();

    const result = await Loan.find(filter)
        .sort(sorting)
        .skip((page.offset - 1) * page.limit)
        .limit(page.limit);

    return { list: result, pageInfo: { Total_Loans: total.length, ...page } };
};

module.exports = listLoans;
