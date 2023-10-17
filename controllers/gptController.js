const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

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

//temporary save file:
// exports.saveLessonToFile = (req, res) => {
//   const { title, content } = req.body;

//   if (!content) {
//     return res.status(400).json({ error: "Content is required." });
//   }

//   const lessonsFilePath = path.join(__dirname, "lessons.json");

//   let lessons = [];

//   if (fs.existsSync(lessonsFilePath)) {
//     lessons = JSON.parse(fs.readFileSync(lessonsFilePath, "utf-8"));
//   }

//   const newLesson = {
//     id: uuidv4(),
//     content,
//   };

//   lessons.push(newLesson);

//   fs.writeFileSync(lessonsFilePath, JSON.stringify(lessons, null, 2));

//   res.json(newLesson);
// };
