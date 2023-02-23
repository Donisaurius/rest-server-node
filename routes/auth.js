const { Router } = require("express");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateUser } = require("../middlewares/validate-user");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").exists(),
    check("email", "El email no es valido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateUser,
  ],
  login
);

module.exports = router;
