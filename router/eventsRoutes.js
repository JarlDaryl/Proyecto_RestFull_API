const addEvent = require("../controllers/eventsController");

const router = require("express").Router();

router.post("/", addEvent);

module.exports = router;
