const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    out_date: { type: Date, default: Date.now },
    due_date: { type: Date, required: true },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Borrower",
        required: true,
    },
});

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publisher",
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    copies: { type: Number, default: 1 },
    is_deleted: { type: Boolean, default: false },
});

const adminSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    is_super: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
});

const borrowerSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    address: { type: String },
    phone: { type: String, unique: true, required: true },
    is_deleted: { type: Boolean, default: false },
});

const Loan = mongoose.model("Loan", loanSchema);
const Book = mongoose.model("Book", bookSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Borrower = mongoose.model("Borrower", borrowerSchema);

module.exports = { Loan, Book, Admin, Borrower };

const express = require("express");
const router = express.Router();
const { Loan, Book, Admin, Borrower } = require("./models"); // Replace './models' with the correct path to your models file

// POST /loan + TOKEN
router.post("/loan", async (req, res) => {
    try {
        const { book, borrower } = req.body;
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 60); // Add 60 days to the current date

        // Check if the book can be loaned (max 2 months loan period)
        const existingLoans = await Loan.countDocuments({
            book,
            is_returned: false,
        });
        if (existingLoans >= 2) {
            return res.status(400).json({
                error: "Book cannot be loaned for more than 2 months.",
            });
        }

        // Check if the book is currently available
        const bookDoc = await Book.findById(book);
        if (!bookDoc || bookDoc.is_deleted || bookDoc.copies <= existingLoans) {
            return res
                .status(400)
                .json({ error: "Book is not available for loan." });
        }

        // Create the loan
        const loan = new Loan({
            book,
            borrower,
            due_date: dueDate,
            admin: req.user._id, // Assuming you have the authenticated user stored in req.user
        });

        await loan.save();

        return res.status(201).json(loan);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong." });
    }
});

// GET /loans + TOKEN
router.get("/loans", async (req, res) => {
    try {
        const { book, admin } = req.query;
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const filters = {};
        if (book) filters.book = book;
        if (admin) filters.admin = admin;

        const totalLoans = await Loan.countDocuments(filters);
        const loans = await Loan.find(filters)
            .populate("book", "title")
            .populate("borrower", "full_name")
            .populate("admin", "full_name")
            .sort({ out_date: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        return res.json({
            page,
            perPage,
            totalLoans,
            loans,
        });
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong." });
    }
});

// GET /loans/:id + TOKEN
router.get("/loans/:id", async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id)
            .populate({
                path: "book",
                populate: [
                    { path: "author", select: "name" },
                    { path: "publisher", select: "name" },
                ],
            })
            .populate("admin", "full_name")
            .populate("borrower", "full_name");

        if (!loan) {
            return res.status(404).json({ error: "Loan not found." });
        }

        return res.json(loan);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong." });
    }
});

module.exports = router;
