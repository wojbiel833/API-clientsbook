const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const db = require("../db");

const app = express();

router.route("/concerts").get((req, res) => {
  res.json(db.concerts);

  if (db.concerts) {
    res.json({ message: "OK!" });
  } else res.status(404).send({ message: "Not found..." });
});

router.route("/concerts/:id").get((req, res) => {
  res.json(db.concerts.find((el) => el.id == req.params.id));
});

router.route("/concerts/random").get((req, res) => {
  let id;
  res.json(db.concerts[`${Math.floor(Math.random() * db.concerts.length)}`]);
});

router.route("/concerts").post((req, res) => {
  db.concerts.push({
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  });
});

router.route("/concerts/:id").put((req, res) => {
  const testimonial = db.concerts.find((el) => el.id == req.param.id);

  if (!testimonial) {
    res.json({ message: "Not ok!" });
  } else {
    author = req.body.author;
    text = req.body.text;
    res.json({ message: "OK!" });
  }
});

router.route("/concerts/:id").delete((req, res) => {
  const index = db.concerts.find((el) => {
    el.id == req.param.id;
  });
  db.concerts.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
