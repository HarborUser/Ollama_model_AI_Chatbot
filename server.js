import express from "express";
import cors from "cors";
import { askRag } from "./rag.js"; 
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(__dirname));


app.post("/ask", async (req, res) => {
  const { question } = req.body;
  const answer = await askRag(question);
  res.json({ answer });
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
