const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const db = require("../db");

const app = express();

router.route("/seats").get((req, res) => {
  res.json(db.seats);

  if (db.seats) {
    res.json({ message: "OK!" });
  } else res.status(404).send({ message: "Not found..." });
});

router.route("/seats/:id").get((req, res) => {
  res.json(db.seats.find((el) => el.id == req.params.id));
});

router.route("/seats/random").get((req, res) => {
  let id;
  res.json(db.seats[`${Math.floor(Math.random() * db.seats.length)}`]);
});

router.route("/seats").post((req, res) => {
  db.seats.push({
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  });
});

router.route("/seats/:id").put((req, res) => {
  const seat = db.seats.find((el) => el.id == req.params.id);

  if (!seat) {
    res.json({ message: "Not ok!" });
  } else {
    author = req.body.author;
    text = req.body.text;
    res.json({ message: "OK!" });
  }
});

router.route("/seats/:id").delete((req, res) => {
  const index = db.seats.find((el) => {
    el.id == req.param.id;
  });
  db.seats.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
