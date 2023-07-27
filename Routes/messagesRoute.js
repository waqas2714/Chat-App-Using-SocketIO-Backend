const { addMessage } = require("../controllers/messagesController");
const { getMessages } = require("../controllers/messagesController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;