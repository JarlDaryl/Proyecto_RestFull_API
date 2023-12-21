const { addUser, login } = require("../controllers/userControllers");
const {verifyToken} = require("../middlewares/auth");
const {refreshToken} = require("../utils/utils")


const router = require("express").Router();


router.post("/", addUser);
router.post("/login", login);

module.exports = router;