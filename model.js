import mongoose from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id; // ta bort _id när vi skickar (detta ersätter med id istället)
    delete converted.__v; // ta bort __v när vi skickar
  },
});

const noteSchema = new mongoose.Schema({
  content: String, // note i databasen ska ha "content" property av typen String
  important: Boolean, // note i databasen ska ha "important" property av typen Boolean
});

export default mongoose.model("Note", noteSchema); // skapa model och exportera
