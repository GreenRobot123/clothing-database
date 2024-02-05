const express = require("express");
const app = express();
const port = 3002;

const user_model = require("./user_model.js");

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization"
  );
  next();
});

app.options("*", (req, res) => {
  res.status(200).end();
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

app.get("/user_data/:id", (req, res) => {
  const userId = req.params.id;

  user_model
    .getUserDataById(userId)
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(404).send("User not found");
      }
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

app.get("/check_email/:email", (req, res) => {
  const emailToCheck = req.params.email;

  user_model
    .checkEmailExists(emailToCheck)
    .then((exists) => {
      res.json({ exists });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });
});

app.get("/user_email/:email", (req, res) => {
  const email = req.params.email;

  user_model
    .getUserByEmail(email)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
