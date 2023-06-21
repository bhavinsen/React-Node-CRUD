const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

// Database connect function
const ConnectDB = () => {
  mongoose
    .connect(process.env.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected Successfully!!!!!!"))
    .catch((err) => {
      console.log("somthing went wrong", err);
    });
};

module.exports = ConnectDB;
