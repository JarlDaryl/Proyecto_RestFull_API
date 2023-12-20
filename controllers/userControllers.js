const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/utils");

const addUser = async (req, res) => {
  try {
    const newUser = new userModel({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    await newUser.save();
    res.status(201).json({
      status: "Succeed",
      message: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(404)
        .json({ status: "Failed", data: null, error: "El correo ya existe" });
    }
    if (error.message.includes("Correo incorrecto")) {
      res.status(404).json({
        status: "Failed",
        data: null,
        error: "El correo es incorrecto",
      });
    }
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validatePassword) {
        const token = generateToken({});
      }
    }
  } catch (error) {}
};

module.exports = { addUser, login };
