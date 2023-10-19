const express = require("express");
const router = express.Router();
const gptController = require("../controllers/gptController");

router.post("/sendToGPT", gptController.sendMessageToGPT);
router.post("/saveLessonToDB", gptController.saveLessonToDB);
router.get("/getLessons", gptController.getLessons);
router.delete("/deleteLesson/:lessonId", gptController.deleteLesson);

module.exports = router;
