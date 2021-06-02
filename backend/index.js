const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const authRoutes = require("./Routes/auth");
const formationRoute = require("./Routes/formations");
const errorController = require("./Controllers/error");
const evaluationRoute = require("./routes/evaluations");

const ports = process.env.port || 3000;

app.use(bodyParser.json());

//headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
});

app.use("/auth", authRoutes); //authentication route

app.use("/formations", formationRoute); //formations route

app.use("/evaluation", evaluationRoute); //formations route

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`listening on port ${ports}`));
