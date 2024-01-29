const express = require("express");
const app = express();
const port = 3001;

const clothes_model = require("./clothes_model");

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
  clothes_model
    .getClothesData()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });
});

app.post("/clothes", (req, res) => {
  clothes_model
    .addClothes(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });
});

app.delete("/clothes/:id", (req, res) => {
  clothes_model
    .deleteClothes(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });
});

app.put("/clothes/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  clothes_model
    .updateClothes(id, body)
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
