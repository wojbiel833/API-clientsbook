const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const db = require("../db");

const app = express();

router.route("/testimonials").get((req, res) => {
  res.json(db.testimonials);

  //   if (db.testimonials) {
  //     res.json({ message: "OK!" });
  //   } else res.status(404).send({ message: "Not found..." });
});

router.route("/testimonials/:id").get((req, res) => {
  res.json(db.testimonials.find((el) => el.id == req.params.id));
});

router.route("/testimonials/random").get((req, res) => {
  let id;
  res.json(
    db.testimonials[`${Math.floor(Math.random() * db.testimonials.length)}`]
  );
});

router.route("/testimonials").post((req, res) => {
  db.testimonials.push({
    author: req.body.author,
    text: req.body.text,
    id: uuidv4(),
  });
});

router.route("/testimonials/:id").put((req, res) => {
  const testimonial = db.testimonials.find((el) => el.id == req.param.id);

  if (!testimonial) {
    res.json({ message: "Not ok!" });
  } else {
    author = req.body.author;
    text = req.body.text;
    res.json({ message: "OK!" });
  }
});

router.route("/testimonials/:id").delete((req, res) => {
  const index = db.testimonials.find((el) => {
    el.id == req.param.id;
  });
  db.testimonials.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
