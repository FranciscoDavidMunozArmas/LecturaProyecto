import multer from "multer";
import { v4 } from "uuid";
import path from "path";
import { CONSTANTS } from "../lib/utils";

const storage = multer.diskStorage({
    destination: CONSTANTS.AUDIO_FOLDER_ROUTE,
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname));
    }
});

export default multer({ storage });