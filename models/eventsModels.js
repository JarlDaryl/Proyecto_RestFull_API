const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, "El titulo es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: [true, "La ubicación es obligatoria"],
  },
  ticketPrice: {
    type: Number,
    required: [true, "El precio es obligatorio"],
    min: [0, "El precio no puede ser 0 o menor"],
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencia al modelo de usuario
    },
  ],
});

const event = mongoose.model("Event", eventSchema, "events");

module.exports = event;
