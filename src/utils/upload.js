const multer = require("multer");
const fs = require("fs");
const path = require("path");

exports.upload = (collection) => {
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/images/${collection}`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${collection}-${Date.now()}.${ext}`);
    },
  });

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload only images."), false);
    }
  };

  return multer({ storage: multerStorage, fileFilter: multerFilter });
};

exports.deleteImageFromServer = (collection, image) => {
  const pathFile = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "images",
    collection,
    image
  );
  fs.unlink(pathFile, (err) => {
    console.log("Previous photo has been deleted");
    if (err) return console.log(err);
  });
};
