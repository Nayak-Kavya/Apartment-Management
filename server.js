const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 3019;

const app = express();

// Middleware for handling JSON requests
app.use(express.json());  // Handles incoming JSON data
app.use(express.static(__dirname));

mongoose.connect("mongodb://localhost:27017/students", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connection successful");
});

const userSchema = new mongoose.Schema({
  name: String,
  address: String,
  LoginTime: String,
  LogoutTime: String,
  doorNumber: String,
  flatName: String,
});

const users = mongoose.model("data", userSchema);

// Route for serving the homepage (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route for submitting the form data
app.post("/submit-log", async (req, res) => {
  const { name, address, LoginTime, LogoutTime, doorNumber, flatName } = req.body;
  const user = new users({
    name,
    address,
    LoginTime,
    LogoutTime,
    doorNumber,
    flatName,
  });

  try {
    await user.save();
    console.log(user);
    res.json({ message: "Data Saved" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Error saving data" });
  }
});

app.listen(port, () => {
  console.log("Server started on port", port);
});
