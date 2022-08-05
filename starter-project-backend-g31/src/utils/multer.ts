import multer, { Multer } from 'multer'
import path from 'path';

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') { 
            cb(null , false);
        }
        cb(null , true);
    }
})

export default upload