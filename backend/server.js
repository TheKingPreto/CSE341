const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Conecting with local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/professionalDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Checking conection
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB!");
});

//  Data model (Schema)
const professionalSchema = new mongoose.Schema({
  professionalName: String,
  nameLink: {
    firstName: String,
    url: String,
  },
  primaryDescription: String,
  workDescription1: String,
  workDescription2: String,
  linkTitleText: String,
  linkedInLink: {
    text: String,
    link: String,
  },
  githubLink: {
    text: String,
    link: String,
  },
});

const Professional = mongoose.model("Professional", professionalSchema);

// 📍 Endpoint to return the first register
app.get("/professional", async (req, res) => {
  try {
    const data = await Professional.find(); 
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

// 🚀 Init server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
