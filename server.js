const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(" connected to mongo");
    app.listen(PORT, () => {
      console.log(`🚀 App running on PORT: http://localhost:${PORT} 🚀`);
    });
  });

// routes
app.use(require("./routes/api-routes"));
require("./routes/html-routes")(app);

// app.listen(PORT, () => {
//   console.log(`🚀 App running on PORT: http://localhost:${PORT} 🚀`);
// });
