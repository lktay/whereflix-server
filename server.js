"use strict";
//imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

//handler imports
const notFound = require("./handlers/error/404.js");
const serverErr = require("./handlers/error/500.js");

const {
  homeHandler,
  mediaListHandler,
  mediaAddHandler,
  mediaDeleteHandler,
  mediaCompleteHandler,
} = require("./handlers/database/mediaHandlers.js");

app.get("/", homeHandler);
app.get("/medialist", mediaListHandler);
app.post("/medialist/add", mediaAddHandler);
app.get("/medialist/complete/:id", mediaCompleteHandler);
app.delete("/medialist/delete/:id", mediaDeleteHandler);
app.get("*", notFound);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_DB_NAME,
});

app.use(serverErr);

app.listen(PORT, () => {
  console.log(`listening listening on ${PORT} :)`);
});
