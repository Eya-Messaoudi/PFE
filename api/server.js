require("dotenv").config();

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./Routes/adminRoutes");
const teacherRoutes = require("./Routes/teacherRoutes");
const parentRoutes = require("./Routes/parentRoutes");
const loginSignupRoute = require("./Routes/loginSignupRoutes");

//express app
const app = express();

app.use("/uploads", express.static("uploads"));

app.use(express.json({ limit: "10mb" })); // Adjust the limit as per your requirement
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

app.use("/admin", adminRoutes);
app.use("/teacher", teacherRoutes);
app.use("/parent", parentRoutes);
app.use(loginSignupRoute);

app.listen(3002, () => {
  console.log("server started at localhost 3002");
});
