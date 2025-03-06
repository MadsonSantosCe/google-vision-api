import { RequestHandler } from "express";
import path, { format } from "path";
import fs from "fs";
import { CardDataAnalyzer } from "../services/cardService";
import { formatJson } from "../ultils/formatJson";

const __dirname = path.resolve();

export const saveAndExtractPokemonCardData : RequestHandler = async (req, res) => {

  try {
    let responseJson = "";
    const responseText = await CardDataAnalyzer(req.file?.filename || "");
    if (typeof responseText === 'string') {
       responseJson =  formatJson(responseText);
    }
    res.json({ data: responseJson });

} catch (error) {
    res.status(500).json({ error: "Erro ao processar a imagem", details: error });
}
};

export const readFile: RequestHandler = (req, res) => {
    const directoryPath = path.join(__dirname, "public", "uploads");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao ler diretório", error: err });
    }

    const images = files.map((file) => ({
      name: file,
      url: `http://localhost:${process.env.PORT}/${file}`,
    }));

    res.json(images);
  });
};