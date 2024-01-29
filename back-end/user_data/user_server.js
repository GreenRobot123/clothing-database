const express = require("express");
const app = express();
const port = 3002;

const user_model = require("./user_model.js");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  user_model
    .getUserData()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });
});

app.post("/user_data", (req, res) => {
  user_model
    .addUser(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });
});

app.delete("/user_data/:id", (req, res) => {
  user_model
    .deleteUser(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });
});

app.put("/user_data/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  user_model
    .updateUser(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
