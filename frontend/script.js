const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());

// Sample data to send to the frontend
const professionalData = {
  professionalName: "Lucas Silva",
  nameLink: {
    firstName: "Lucas",
    url: "https://example.com"
  },
  primaryDescription: "I am a developer passionate about creating practical and creative solutions.",
  workDescription1: "I have experience with JavaScript, Node.js, and web development.",
  workDescription2: "Currently learning about APIs, system integration, and backend best practices.",
  linkTitleText: "Connect with me:",
  linkedInLink: {
    text: "My LinkedIn",
    link: "https://www.linkedin.com/in/lucas-oliveira-silva032/"
  },
  githubLink: {
    text: "My GitHub",
    link: "https://github.com/TheKingPreto"
  }
};

// API endpoint
app.get("/professional", (req, res) => {
  res.json(professionalData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
