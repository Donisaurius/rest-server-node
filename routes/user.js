const { Router } = require("express");
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
} = require("../controllers/user");
const { body, param, query } = require("express-validator");
const {
  roleValidator,
  emailExist,
  existUserById,
} = require("../helpers/db-validators");

const {
  validateUser,
  validateJwt,
  isAdminRole,
  hasRole,
} = require("../middlewares");

const router = Router();

router.get(
  "/",
  [
    query("limit", "Limit debe un numero").isNumeric(),
    query("page", "Page debe un numero").isNumeric(),
    validateUser,
  ],
  getUsers
);
router.put(
  "/:id",
  [
    param("id", "No es un ID valido").isMongoId(),
    param("id").custom(existUserById),
    body("role").custom(roleValidator),
    validateUser,
  ],
  putUsers
);
router.post(
  "/",
  [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("password", "El password es obligatorio").isLength({ min: 6 }),
    body("email", "Email invalido").isEmail(),
    body("role").custom(roleValidator),
    body("email").custom(emailExist),
    validateUser,
  ],
  postUsers
);
router.delete(
  "/:id",
  [
    validateJwt,
    // isAdminRole,
    hasRole("ADMIN_ROLE", "VENDOR_ROLE"),
    param("id", "No es un ID valido").isMongoId(),
    param("id").custom(existUserById),
    validateUser,
  ],
  deleteUsers
);

module.exports = router;
