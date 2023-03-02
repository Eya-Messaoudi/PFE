const express = require("express");

console.log("hello eya!")


const app = express();
app.listen(3000, () => {
  console.log("server started at localhost 3001");
});
