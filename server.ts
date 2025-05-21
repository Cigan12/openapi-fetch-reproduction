import express from "express";
import type { Request, Response } from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// File upload endpoint
app.post(
  "/upload",
  upload.single("file"),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    console.log("Content-Length:", req.headers["content-length"]);

    res.json({
      message: "File uploaded successfully",
      size: req.file.size,
    });
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
