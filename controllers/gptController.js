const axios = require("axios");
const knex = require("../db");

exports.sendMessageToGPT = async (req, res) => {
  const userMessage = req.body.prompt;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant creating a supply teacher plan.",
          },
          { role: "user", content: userMessage },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const gptResponse = response.data.choices[0]?.message?.content.trim();

    res.json({ message: gptResponse });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
};

exports.saveLessonToDB = async (req, res) => {
  const {
    grade,
    subject,
    subtopic,
    lessonLength,
    studentCount,
    techAvailable,
    devicesCount,
    soundAvailable,
    materialsAvailable,
    teacherInvolvement,
    gptResponse,
  } = req.body;

  try {
    await knex("lessons").insert({
      grade,
      subject,
      subtopic,
      lessonLength,
      studentCount,
      techAvailable,
      devicesCount,
      soundAvailable,
      materialsAvailable,
      teacherInvolvement,
      gptResponse,
    });

    res.json({
      success: true,
      message: "Lesson saved to database successfully!",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error saving lesson to database." });
  }
};

exports.getLessons = async (req, res) => {
  try {
    const lessons = await knex("lessons").select("*");
    res.json({ success: true, lessons });
  } catch (error) {
    console.error("Error fetching lessons from database:", error);
    res.status(500).json({ success: false, error: "Failed to fetch lessons." });
  }
};

exports.deleteLesson = async (req, res) => {
  const { lessonId } = req.params;

  try {
    await knex("lessons").where("id", lessonId).del();
    res.json({ success: true, message: "Lesson deleted successfully!" });
  } catch (error) {
    console.error("Error deleting lesson from database:", error);
    res.status(500).json({ success: false, error: "Failed to delete lesson." });
  }
};
