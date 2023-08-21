const Author = require("./Author");

const listAuthors = async ({
    q,
    page = { limit: 5, offset: 1 },
    sort = { by: "", order: "desc" },
    filters,
}) => {
    let filter = {};
    let sorting = {};

    if (q) filter.name = { $regex: new RegExp(q, "i") };
    if (filters) filter = filters;
    if (sort.by == "name")
        sorting = sort.order == "asc" ? { name: 1 } : { name: -1 };

    const total = await Author.find();

    const result = await Author.find(filter)
        .sort(sorting)
        .skip((page.offset - 1) * page.limit)
        .limit(page.limit);

    return { list: result, pageInfo: { Total_Authors: total.length, ...page } };
};

module.exports = listAuthors;
