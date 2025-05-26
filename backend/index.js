import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes.js";

const app = express();

dotenv.config();
// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;




app.use('/uploads', express.static('public/uploads'));

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use(cors());
app.use(express.json());

app.use("/v1/api", routes);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
 