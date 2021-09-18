require("dotenv").config();

const express = require("express");
const path = require("path");
const cookiePasser = require("cookie-parser");

const app = express();
const port = 3000;

const homeRouter = require("./routes/home")
const postsRouter = require("./routes/posts")

// views engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", homeRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
})


