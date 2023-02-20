const { Router } = require("express");
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
} = require("../controllers/user");

const router = Router();

router.get("/", getUsers);
router.put("/", putUsers);
router.post("/", postUsers);
router.delete("/:id", deleteUsers);

module.exports = router;
