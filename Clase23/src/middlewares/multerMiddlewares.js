// en middlewares/multerMiddleware.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "general";
    if (file.mimetype.startsWith("image")) {
      folder = "images";
    } else if (file.mimetype === "application/pdf") {
      folder = "documents";
    }
    cb(null, `uploads/${folder}/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload.single("file");
