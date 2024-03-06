import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Note from "./model.js";

const app = express();
app.use(cors()); // middleware för att tillåta extern kommunikation
app.use(bodyParser.json()); // middleware för att kunna ta emot json format

app.get("/notes", async (req, resp) => {
  const notes = await Note.find(); // hämta alla notes från databas
  resp.status(200).json(notes);
});

app.delete("/notes/:id", async (req, resp) => {
  const { id } = req.params;
  const deletedNote = await Note.findByIdAndDelete(id); // ta bort en note från databas
  resp.status(200).json(deletedNote);
});

app.put("/notes/:id", async (req, resp) => {
  const { id } = req.params;
  await Note.updateOne({ _id: id }, req.body); // uppdatera en note i databas
  const updatedNote = await Note.findById(id); // sedan hämta uppdaterad note från databas
  resp.status(200).json(updatedNote);
});

app.post("/notes", async (req, resp) => {
  const note = new Note(req.body);
  const savedNote = await note.save(); // spara en note i databas
  resp.status(201).json(savedNote);
});

const start = async () => {
  try {
    const dbUrl = "mongodb://localhost:27017/dbnotes";
    await mongoose.connect(dbUrl); // connecta med databas via url (detta kan vara atlas)
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    // om något blir fel i connection stoppa server
    console.error(error);
    process.exit(1);
  }
};
start();
