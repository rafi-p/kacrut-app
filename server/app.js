require("dotenv").config();

const express = require("express");
const cors = require("cors");
const error_handler = require("./middlewares/error_handler");
const app = express();
const router = require("./routes/index");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(error_handler);

app.listen(port, () => console.log("listening at " + port));
