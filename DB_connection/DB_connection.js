const mongoose = require("mongoose");
try {
  mongoose.connect(process.env.DB_URL);
  console.log("connected sucessfull");
} catch (error) {
  console.log(error);
  throw error;
}
