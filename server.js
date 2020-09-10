const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
// app.use("./routes/api.js");
require("./app/routes/html-routes")(app);

app.listen(PORT, () => {
  console.log(`🚀 App running on PORT: http://localhost:${PORT} 🚀`);
});
