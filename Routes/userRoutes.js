const { register, login, setAvatar, getAllUsers } = require("../controllers/userControllers");
const express = require('express');
const router = express.Router();

router.post('/register', register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);

module.exports = router;