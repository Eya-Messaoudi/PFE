require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./Routes/adminRoutes");

//express app
const app = express();

app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

//connecting to db
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/shcool_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connecting to db"))
  .catch(console.error);

//routes
app.use("/admin", adminRoutes);

app.listen(3002, () => {
  console.log("server started at localhost 3002");
});
