const addUser = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/", addUser);

module.exports = router;
