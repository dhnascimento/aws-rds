require("dotenv").config();

const PORT = process.env.PORT || 3003;
const ENV = process.env.ENV || "development";

const express = require("express");
const app = express();

const server = require("http").Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);

const test = require("./routes/test.js");
app.use("", test(db));

db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(pino);

server.listen(PORT, () =>
  console.log(`Express server is running on port ${PORT}`)
);
