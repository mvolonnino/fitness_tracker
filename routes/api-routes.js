const router = require("express").Router();
const Workout = require("../models/workoutModel");
const mongojs = require("mongojs");
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
  console.log("body: ", typeof body);
  const keys = Object.keys(body);
  console.log("keys: ", keys);

  // if (keys.length === 0) {
  //   console.log("empty obj");
  //   return;
  // } else {
  Workout.create({})
    .then((response) => {
      console.log("response: ", response);
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  // }
});

// router.get("/api/workouts/range");

module.exports = router;
