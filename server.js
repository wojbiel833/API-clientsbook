const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const app = express();

const db = require("./db");

// import routes
const testimonialsRoutes = require("./routes/testimonials");

app.use("/api", testimonialsRoutes);

app.use(cors());
// app.use(cors({
//     "origin": "https://kodilla.com", //origin sets domains that we approve
//     "methods": "GET,POST", //we allow only GET and POST methods
//   }));

app.get("/concerts", (req, res) => {
  res.json(db.concerts);

  if (db.concerts) {
    res.json({ message: "OK!" });
  } else res.status(404).send({ message: "Not found..." });
});

app.get("/concerts/:id", (req, res) => {
  res.json(db.concerts.find((el) => el.id == req.params.id));
});

app.get("/concerts/random", (req, res) => {
  let id;
  res.json(db.concerts[`${Math.floor(Math.random() * db.concerts.length)}`]);
});

app.post("/concerts", (req, res) => {
  db.concerts.push({
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  });
});

app.put("/concerts/:id", (req, res) => {
  const testimonial = db.concerts.find((el) => el.id == req.param.id);

  if (!testimonial) {
    res.json({ message: "Not ok!" });
  } else {
    author = req.body.author;
    text = req.body.text;
    res.json({ message: "OK!" });
  }
});

app.delete("/concerts/:id", (req, res) => {
  const index = db.concerts.find((el) => {
    el.id == req.param.id;
  });
  db.concerts.splice(index, 1);
  res.json({ message: "OK" });
});

app.get("/seats", (req, res) => {
  res.json(db.seats);

  if (db.seats) {
    res.json({ message: "OK!" });
  } else res.status(404).send({ message: "Not found..." });
});

app.get("/seats/:id", (req, res) => {
  res.json(db.seats.find((el) => el.id == req.params.id));
});

app.get("/seats/random", (req, res) => {
  let id;
  res.json(db.seats[`${Math.floor(Math.random() * db.seats.length)}`]);
});

app.post("/seats", (req, res) => {
  db.seats.push({
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  });
});

app.put("/seats/:id", (req, res) => {
  const testimonial = db.seats.find((el) => el.id == req.param.id);

  if (!testimonial) {
    res.json({ message: "Not ok!" });
  } else {
    author = req.body.author;
    text = req.body.text;
    res.json({ message: "OK!" });
  }
});

app.delete("/seats/:id", (req, res) => {
  const index = db.seats.find((el) => {
    el.id == req.param.id;
  });
  db.seats.splice(index, 1);
  res.json({ message: "OK" });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});
