// controllers/gptController.js

const axios = require("axios");

exports.sendMessageToGPT = async (req, res) => {
  const userMessage = req.body.prompt;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
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
    console.error("Error:", error.response.data);
    res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
};
