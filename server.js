const express = require("express");
const ejs = require("ejs");
const path = require("node:path");

const getCurrentDate = () => new Date().toISOString().substr(0, 10);

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: getCurrentDate(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: getCurrentDate(),
  },
];

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { messages });
});

app
  .route("/new")
  .get((req, res) => {
    res.render("form");
  })
  .post((req, res) => {
    const { username: user, message: text } = req.body;
    messages.push({ user, text, added: getCurrentDate() });
    res.redirect("/");
  });

app.listen(3000, () => console.log("Server is Listening!"));
