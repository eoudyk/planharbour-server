const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/sendToGPT", async (req, res) => {
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
    console.log("Error:", error.response.data);
    res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
