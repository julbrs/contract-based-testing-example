const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const users = require("./data/users");

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/user/:slug", (req, res) => {
  const slug = req.params.slug;
  const user = users.find((user) => user.slug === slug);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

module.exports = {
  app,
  users,
};
