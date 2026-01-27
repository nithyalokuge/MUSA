// Entry point of MUSA 

require('dotenv').config();
const express = require("express");
const path = require("path");
const artifactRoutes = require('./routes/artifactRoute');

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use('/hunt/artifacts', artifactRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("index"); 
});

// Museums page
app.get("/museums", (req, res) => {
  res.render("museums"); 
});

// Scan page
app.get("/scan", (req, res) => {
  res.render("scan"); 
});

// About Us page
app.get("/about-us", (req, res) => {
  res.render("about-us"); 
});

// Settings page
app.get("/settings", (req, res) => {
  res.render("settings"); 
});

// Info & Support page
app.get("/info-support", (req, res) => {
  res.render("info-support"); 
});

// The Hunt Museum Home page
app.get("/hunt/home", (req, res) => {
  res.render("hunt/home"); 
});

// The Hunt Museum Explore page
app.get("/hunt/explore", (req, res) => {
  res.render("hunt/explore"); 
});

// The Hunt Museum Quiz game page
app.get("/hunt/games/quiz", (req, res) => {
  res.render("hunt/games/quiz"); 
});

// The Hunt Museum Puzzle game page
app.get("/hunt/games/puzzle", (req, res) => {
  res.render("hunt/games/puzzle"); 
});

// The Hunt Museum Matching game page
app.get("/hunt/games/matching", (req, res) => {
  res.render("hunt/games/matching"); 
});

// The Hunt Museum Memory game page
app.get("/hunt/games/memory", (req, res) => {
  res.render("hunt/games/memory"); 
});

// The Hunt Museum Timeline game page
app.get("/hunt/games/timeline", (req, res) => {
  res.render("hunt/games/timeline"); 
});

// The Hunt Museum Catching game page
app.get("/hunt/games/catching", (req, res) => {
  res.render("hunt/games/catching");
});

app.listen(port, () => {
  console.log(`The server is running at https://localhost:${port}!`);
});
