const router = require("express").Router();
// const Workout = require("../models/workoutModel");
const db = require("../models");

router.get("/api/workouts", ({ body }, res) => {
  db.Workout.find({})
    .then((response) => {
      console.log("response: ", response);
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log("body: ", req.body);
  console.log("req.params.id: ", req.params.id);
  db.Workout.updateOne({
    _id: req.params.id,
  })
    .then((response) => {
      console.log("response: ", response);
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range");

module.exports = router;
