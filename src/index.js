const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const validateUser = require("./middlewares/validateUser.middleware");

const app = express();
app.use(express.json());

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 3000;

let id = 0;

const users = [];

app.get("/users", (req, res) => {
  res.json({ users: users });
});

app.post("/users", validateUser, (req, res) => {
  const user = req.body;
  user.id = ++id;

  users.push(user);

  res.json({ msg: "Usuário adicionado com sucesso." });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
