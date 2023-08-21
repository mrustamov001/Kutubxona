const Book = require("./Books");

const listBooks = async ({
    q,
    page = { limit: 5, offset: 1 },
    sort = { by: "", order: "desc" },
    filters,
}) => {
    let filter = {};
    let sorting = {};

    if (q) filter.title = { $regex: new RegExp(q, "i") };
    if (filters) filter = filters;
    if (sort.by == "copies")
        sorting = sort.order == "asc" ? { copies: 1 } : { copies: -1 };

    const total = await Book.find();

    const result = await Book.find(filter)
        .sort(sorting)
        .skip((page.offset - 1) * page.limit)
        .limit(page.limit);

    return { list: result, pageInfo: { Total_Books: total.length, ...page } };
};

module.exports = listBooks;
