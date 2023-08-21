const mongoose = require("mongoose");

module.exports = function () {
    return mongoose
        .connect("mongodb://127.0.0.1:27017/Lesson_4-1", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log(`Connect to Mongoose`);
        })
        .catch((error) => {
            console.log(`Error connecting to Mongo Mongoose: ${error}`);
        });
};
