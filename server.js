const app = require('./app');
const mongoose = require("mongoose");
// const dotenv=require("dotenv");
// dotenv.config();
// const {DB_HOST,PORT=3004} = process.env;
mongoose.connect(process.env.DB_HOST).then(() => {
  app.listen(process.env.PORT);
  console.log(`Database connection successful on${process.env.PORT}!!!`)
} )
    .catch((error) => {
      console.log(process.env.DB_HOST)
    console.log(error.message)
    process.exit(1)
});
