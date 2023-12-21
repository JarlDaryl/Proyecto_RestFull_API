const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken, refreshToken } = require("../utils/utils");

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

const signup = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validatePassword) {
        const token = generateToken({d: user.id, email: user.email},
          false
          );
          const token_refresh = generateToken(
            { id: user.id, email: user.email},
            true
          );
          return res.status(201).json({
            status: "Success",
            message: "Usuario logueado correctamente",
            data: {
              user: user,
              token: token,
              token_refresh: token_refresh,
            },
          });
      }
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Usuario y contraseña no encontrado",
      });
    }
    return res.status(400).json({
      status: "failed",
      data: null,
      error: "Usuario y contraseña no encontrado",
    });
  } catch (error) {
    res
    .status(404)
    .json({ status: "Failed", data: null, error: error.message });
  }
};



// const getAttendees = async(req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (user) {
//       const validatePassword = await bcrypt.compare(
//         req.body.password,
//         user.password
//       );
//       if (validatePassword) {
//         const token = generateToken({d: user.id, email: user.email},
//           false);
//           const token_refresh = generateToken(
//             { id: user.id, email: user.email},
//             true
//           );
//           return res.status(201).json({
//             status: "Success",
//             message: "Usuario logueado correctamente",
//             data: {
//               user: user,
//               token: token,
//               token_refresh: token_refresh,
//             },
//           });
//       }
//       if(user){

//       }
//       return res.status(400).json({
//         status: "failed",
//         data: null,
//         error: "Usuario y contraseña no encontrado",
//       });
//     }
//     return res.status(400).json({
//       status: "failed",
//       data: null,
//       error: "Usuario y contraseña no encontrado",
//     });
//   } catch (error) {
//     res
//     .status(404)
//     .json({ status: "Failed", data: null, error: error.message });
//   }
// }


module.exports = { addUser, signup };
// getAttendees
