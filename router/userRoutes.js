const { addUser, login } = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/", addUser);
router.post("/login", login);

module.exports = router;
