import express from "express";

const app = express();
const port = process.env.PORT || 8000;

// Basic GET API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
