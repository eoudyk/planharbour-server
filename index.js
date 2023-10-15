const express = require("express");
const cors = require("cors");
require("dotenv").config();

const gptRoutes = require("./routes/gptRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;

app.use("/", gptRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
