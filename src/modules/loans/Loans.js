const mongoose = require("mongoose");

const currentDate  = new Date();
const maxDueDate  = new Date(currentDate );
maxDueDate .setMonth(maxDueDate .getMonth() + 2);

const loanSchema = new mongoose.Schema(
    {
        book: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Book",
            required: true,
        },
        out_date: { type: Date, default: currentDate  },
        due_date: { type: Date, default: maxDueDate  },
        admin: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Admin",
            required: true,
        },
        borrower: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Borrower",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
