const express = require("express");
const path = require("path");

//const loger = require("./midleware/loger");

const app = express();
//body parser midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//init modleware
//app.use(loger);

//sending file from a folder
/*
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
*/
// set static folder

app.use(express.static(path.join(__dirname, "public")));
//routes
app.use("/api/members", require("./routes/api/members"));

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("server started on 3000");
});
