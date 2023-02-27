const { Router } = require("express");
const { uploadFile, updateImg, showImg } = require("../controllers/uploads");
const { check } = require("express-validator");

const { validateUser, validateFile } = require("../middlewares/");
const { colectionsPermited } = require("../helpers");

const router = Router();

router.post("/", [validateFile], uploadFile);
router.put(
  "/:colection/:id",
  [
    validateFile,
    check("id", "El id es invalido").isMongoId(),
    check("colection").custom((c) =>
      colectionsPermited(c, ["users", "products"])
    ),
    validateUser,
  ],
  updateImg
);
router.get(
  "/:colection/:id",
  [
    check("id", "El id es invalido").isMongoId(),
    check("colection").custom((c) =>
      colectionsPermited(c, ["users", "products"])
    ),
    validateUser,
  ],
  showImg
);

module.exports = router;
