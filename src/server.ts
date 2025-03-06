import express from "express";
import cors from "cors";
import { upload } from "./libs/multer";
import * as uploadController from "./controllers/uploadController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/upload", upload.single("file"), uploadController.saveAndExtractPokemonCardData);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
