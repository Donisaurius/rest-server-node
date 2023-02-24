const { Router } = require("express");
const {
  products,
  detail,
  create,
  update,
  deleteProduct,
} = require("../controllers/products");
const { validateJwt, validateUser, hasRole } = require("../middlewares");
const { check } = require("express-validator");
const categoryExist = require("../middlewares/category-exist");
const { existUserById, productExist } = require("../helpers/db-validators");

const router = Router();

/* Public */
router.get("/", products);

router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id", "El producto no existe").custom(productExist),
    validateUser,
  ],
  detail
);
/* Public */

/* Private - Any token */
router.post(
  "/",
  [
    validateJwt,
    check("name", "El nombre es requerido").not().isEmpty(),
    check("name", "Formato invalido para el nombre").isString(),
    check("user", "El usuario es requerido").not().isEmpty(),
    check("user", "Formato invalido para usuario").isMongoId(),
    check("user").custom(existUserById),
    check("category", "Formato invalido para category").isMongoId(),
    check("category", "El category es requerido").not().isEmpty(),
    check("category", "La categoria no existe").custom(categoryExist),
    check("price", "El precio debe ser un numero").isNumeric(),
    hasRole("ADMIN_ROLE", "VENDOR_ROLE"),
    validateUser,
  ],
  create
);
router.put(
  "/:id",
  [
    validateJwt,
    hasRole("ADMIN_ROLE", "VENDOR_ROLE"),
    check("name", "El nombre es requerido").not().isEmpty(),
    check("name", "Formato invalido para el nombre").isString(),
    check("id", "El id no es valido").isMongoId(),
    check("id", "El producto no existe").custom(productExist),
    check("price", "El precio debe ser un numero").isNumeric(),
    validateUser,
  ],
  update
);
router.delete(
  "/:id",
  [
    validateJwt,
    hasRole("ADMIN_ROLE", "VENDOR_ROLE"),
    check("id", "El id no es valido").isMongoId(),
    check("id", "El producto no existe").custom(productExist),
    validateUser,
  ],
  deleteProduct
);
/* Private - Any token */

module.exports = router;
