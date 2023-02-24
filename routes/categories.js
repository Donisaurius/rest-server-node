const { Router } = require("express");
const {
  categories,
  details,
  update,
  deleteCategory,
  createCategory,
} = require("../controllers/categories");
const { validateJwt, validateUser } = require("../middlewares");
const { check, param } = require("express-validator");
const categoryExist = require("../middlewares/category-exist");

const router = Router();

/* PUBLIC PATH */
router.get("/", categories);

router.get(
  "/:id",
  [
    param("id", "El id no es valido").isMongoId(),
    check("id", "La categoria no existe").custom(categoryExist),
    validateUser,
  ],
  details
);

/* PRIVADO-> CON CUALQUIER ROL */
router.post(
  "/",
  [
    validateJwt,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validateUser,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    validateJwt,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    param("id", "El id no es valido").isMongoId(),
    check("id", "La categoria no existe").custom(categoryExist),
    validateUser,
  ],
  update
);

router.delete(
  "/:id",
  [
    validateJwt,
    param("id", "El id no es valido").isMongoId(),
    check("id", "La categoria no existe").custom(categoryExist),
    validateUser,
  ],
  deleteCategory
);
/* PRIVADO-> CON CUALQUIER ROL */

module.exports = router;
