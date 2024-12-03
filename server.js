const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/uploadFile', upload.single('file'), (req, res) => {
  const fileUrl = `http://localhost:3001/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});

app.use('/images/uploads', express.static(path.join(__dirname, 'public/images/uploads')));

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});