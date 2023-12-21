const {addEvent, getEventByUserId, addUserToEvent, profitsForEvent, donwloadEventExcel, donwloadEventPDF} = require("../controllers/eventsController");
const {verifyToken} = require("../middlewares/auth");


const router = require("express").Router();

router.post("/", addEvent);
router.post("/getEventByUserId", verifyToken, getEventByUserId);
router.post("/addUserToEvent", addUserToEvent);
router.patch("/:eventId/profitsForEvent", profitsForEvent);
router.get("/donwloadEventExcel", donwloadEventExcel);
router.get("/donwloadEventPDF", donwloadEventPDF);


module.exports = router;
