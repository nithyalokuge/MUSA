// Entry point of Musa

require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Speech-to-text page
app.get("/speech-to-text", (req, res) => {
  res.render("speech-to-text");
});

// Contact Us page
app.get("/contact", (req, res) => {
  res.render("contact");
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

// The Hunt Museum Scan page
app.get("/hunt/scan", (req, res) => {
  res.render("hunt/scan");
});

// The Hunt Museum Map page
app.get("/hunt/map", (req, res) => {
  res.render("hunt/map");
});

// The Hunt Museum Games page
app.get("/hunt/games", (req, res) => {
  res.render("hunt/games");
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

// The Hunt Museum Falling object game page
app.get("/hunt/games/falling", (req, res) => {
  res.render("hunt/games/falling");
});

app.listen(port, () => {
  console.log(`The server is running at https://localhost:${port}!`);
});
