const { addUser, signup } = require("../controllers/userControllers");
// getAttendees,
const {verifyToken} = require("../middlewares/auth");
const {refreshToken} = require("../utils/utils")


const router = require("express").Router();


router.post("/", addUser);
router.post("/signup", signup);
router.get("/getattendees", );
// getAttendees
router.get("/login", verifyToken, refreshToken)

module.exports = router;