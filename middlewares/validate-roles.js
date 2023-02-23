const { request, response } = require("express");

const hasRole = (...roles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.json({
        msg: "Se está verificando el usario y no se ha buscado",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(401).json({
        msg: `Para acceder a este recurso se necesita ser ${roles}`,
      });
    }

    console.log("roles", roles);
    next();
  };
};

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Error validando usuario",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `Usuario: ${name} no es administrador`,
    });
  }
  next();
};

module.exports = {
  isAdminRole,
  hasRole,
};
