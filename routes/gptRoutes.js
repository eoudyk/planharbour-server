const express = require("express");
const router = express.Router();
const gptController = require("../controllers/gptController");

router.post("/sendToGPT", gptController.sendMessageToGPT);

module.exports = router;
