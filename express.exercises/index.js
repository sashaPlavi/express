const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const loger = require("./midleware/loger");
const app = express();
//expres midleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
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
//seting routs for handlebars
app.get("/", (req, res) => {
  res.render("index", { title: "member app" });
});
// set static folder

app.use(express.static(path.join(__dirname, "public")));
//routes
app.use("/api/members", require("./routes/api/members"));

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("server started on 3000");
});
