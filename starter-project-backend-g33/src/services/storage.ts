import multer from "multer";

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb:any) => {
        cb(null, '../../uploads/')
    },

    filename:  (req: any, file: any, cb:any) => {
        cb(null, new Date().toISOString + "_" + file.originalname)
    }
})

const filter =  (req: any, file: any, cb:any) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb({message: 'Unsupported file formatting'} , false)
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024},
    fileFilter: filter
})

export default upload