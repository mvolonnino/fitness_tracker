const router = require("express").Router();
const Workout = require("../models/workoutModel");
const mongojs = require("mongojs");
const { response } = require("express");
// const db = require("../models");

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((response) => {
      // console.log("response: ", response);
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  // console.log(req);
  console.log("body: ", req.body);
  console.log("req.params.id: ", req.params.id);
  Workout.updateOne(
    { _id: req.params.id },
    {
      $push: {
        exercises: [
          {
            _id: mongojs.ObjectID(),
            ...req.body,
          },
        ],
      },
    },
    {
      runValidators: true,
    }
  )
    .then((response) => {
      // console.log("response: ", response);
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create({})
    .then((response) => {
      console.log("response: ", response);
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });

});

router.get("/api/workouts/range", (req, res) => {
  console.log("req: ", req);
  Workout.find({})
    .then((response) => {
      console.log("response: ", response);
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
