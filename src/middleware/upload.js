import multer from 'multer';

// Configuration de Multer
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads/images/');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});


// Création du middleware d'upload
const uploadImageCover = multer({storage: storage}).single('image');

export function uploadCover(req, res, next) {
  try {
    uploadImageCover(req, res, (err) => {
      if (err) {
        throw err;
      }
      next()
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
