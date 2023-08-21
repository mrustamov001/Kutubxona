const mongoose = require("mongoose");
const { hashSync } = require("bcryptjs");
const Admin = require("../src/modules/admins/Admin");
const config = require("../src/shared/config");

mongoose
    .connect(`mongodb://127.0.0.1:27017/${config.db.name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB ga ulandi.");
    })
    .catch((err) => {
        console.log("DB da xatolik: ", err);
    });

const seedAdmin = [
    {
        full_name: "Super Admin",
        username: "superadmin",
        password: hashSync("super1234", 10),
        is_super: true,
        is_deleted: false,
    },
];

const seedDB = async () => {
    await Admin.deleteMany({});
    await Admin.insertMany(seedAdmin);
};

seedDB().then(() => {
    mongoose.connection.close();
});
