const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const db = require("../db");

const app = express();

app.get("/testimonials", (req, res) => {
  res.json(db.testimonials);

  //   if (db.testimonials) {
  //     res.json({ message: "OK!" });
  //   } else res.status(404).send({ message: "Not found..." });
});

app.get("/testimonials/:id", (req, res) => {
  res.json(db.testimonials.find((el) => el.id == req.params.id));
});

app.get("/testimonials/random", (req, res) => {
  let id;
  res.json(
    db.testimonials[`${Math.floor(Math.random() * db.testimonials.length)}`]
  );
});

app.post("/testimonials", (req, res) => {
  db.testimonials.push({
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  });
});

app.put("/testimonials/:id", (req, res) => {
  const testimonial = db.testimonials.find((el) => el.id == req.param.id);

  if (!testimonial) {
    res.json({ message: "Not ok!" });
  } else {
    author = req.body.author;
    text = req.body.text;
    res.json({ message: "OK!" });
  }
});

app.delete("/testimonials/:id", (req, res) => {
  const index = db.testimonials.find((el) => {
    el.id == req.param.id;
  });
  db.testimonials.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
