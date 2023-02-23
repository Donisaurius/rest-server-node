const { request } = require("express");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const validateJwt = async (req = request, res, next) => {
  //Los token de acceso se ponen en los headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Usuario no existe en DB",
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "Usuario no autorizado",
      });
    }

    req.user = user;
    req.uid = uid;

    next();
  } catch (error) {
    console.log("error verificando JWT");
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validateJwt,
};
