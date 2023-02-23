const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "El email no existe",
      });
    }

    //Si el usuario existe

    if (!user.state) {
      return res.status(400).json({
        msg: "Usuario deshabilitado",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Contraseña incorrecta",
      });
    }

    //Crear JWT
    const token = await generateJWT(user._id);

    return res.json({
      msg: "Login ol",
      user,
      token,
    });
  } catch (error) {
    console.log("Error auth login", error);
    return res.status(500).json({
      msg: "Hable con el admin",
    });
  }
};

module.exports = {
  login,
};
