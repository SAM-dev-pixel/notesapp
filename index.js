const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const crypto = require("crypto");
const methodOverride = require("method-override");

const bodyParser = require("body-parser");
const { loadNotes } = require("./utils/app");
let notes = loadNotes();
const noteDate = new Date();
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
  res.render("index", { notes });
});
app.post("/notes", (req, res) => {
  const id = crypto.randomUUID();
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const noteDate = `${date}/${month}/${year}`;
  const { title, text } = req.body;
  notes.push({ title, text, id, date: noteDate });
  res.redirect("/notes");
});
app.get("/notes/:id/detail", (req, res) => {
  const { id } = req.params;
  const note = notes.filter((note) => note.id === id);
  res.render("detail", { note });
});
app.get("/notes/:id/edit", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);
  res.render("edit", { note });
});
app.patch("/notes/:id", (req, res) => {
  const { id } = req.params;
  const edit = req.body;
  const foundNote = notes.find((note) => note.id === id);
  foundNote.title = edit.title;
  foundNote.text = edit.text;
  res.redirect("/notes");
});
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== id);
  res.redirect("/notes");
});
app.listen(1000, () => {
  console.log("http://localhost:1000/notes");
});
