const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const app = express();

const db = require("./db");

// import routes
const testimonialsRoutes = require("./routes/testimonials");
const concertsRoutes = require("./routes/concerts");
const seatsRoutes = require("./routes/seats");

app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);

app.use(cors());
// app.use(cors({
//     "origin": "https://kodilla.com", //origin sets domains that we approve
//     "methods": "GET,POST", //we allow only GET and POST methods
//   }));

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});
