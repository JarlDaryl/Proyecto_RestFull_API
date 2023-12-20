const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    match: [/^\S+@\S+\.\S+$/, "Correo incorrecto"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    trim: true,
    minLength: 4,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("User", userSchema, "users");

module.exports = user;
