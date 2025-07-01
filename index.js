// Entry point of Musa 

require('dotenv').config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}!`);
});
