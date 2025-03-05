import express from "express";
import { upload } from "./libs/multer";
import * as uploadController from "./controllers/uploadController";

const app = express();
app.use(express.json());

app.post("/api/upload", upload.single("file"), uploadController.upload);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
