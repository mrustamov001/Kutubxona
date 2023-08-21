const { ForbiddenError } = require("../../shared/errors");
const Book = require("../books/Books");
const Loan = require("./Loans");

const addLoan = async (data) => {
    const { book, due_date } = data;
    const loan = await Loan.find({ borrower: data.borrower });

    if (loan.length > 10)
        throw new ForbiddenError(`Sorry, you can't get another book.`);

    const currentDate = new Date();
    const maxDueDate = new Date(currentDate);
    maxDueDate.setMonth(maxDueDate.getMonth() + 2);

    loan.filter((i) => {
        if (currentDate > i.due_date)
            throw new ForbiddenError(
                "You have an overdue book, sorry you can't get another book."
            );
    });

    const bookDoc = await Book.findById(book);
    if (!bookDoc || bookDoc.is_deleted) {
        throw new Error("Book is not available for loan.");
    }

    const existingLoan = await Loan.findOne({ book, due_date: null });

    if (existingLoan) throw new ForbiddenError(`Already have ${existingLoan}.`);

    if (due_date && new Date(due_date) > maxDueDate)
        throw new ForbiddenError(
            "Sorry, we cannot give books for more than two months"
        );

    const result = await Loan.create({
        book,
        due_date: due_date || maxDueDate,
        ...data,
    });

    return result;
};

module.exports = addLoan;
