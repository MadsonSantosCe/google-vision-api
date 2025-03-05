import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const guid: string = uuidv4();

const diskStorage = multer.diskStorage({
  filename(req, file, cb) {
    const prefix = guid;
    cb(null, prefix + '.' + file.mimetype.split("/")[1]);
  },
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
});

export const upload = multer({
  storage: diskStorage,
});
