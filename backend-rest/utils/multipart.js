import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${Math.random().toString(36).substring(2)}-${file.originalname}`)
    }
})

export const multipart = multer({storage: storage});
