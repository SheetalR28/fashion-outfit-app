const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

let clothes = [];

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.json({ success: true, token: 'demo-token' });
});

app.post('/upload', upload.single('image'), (req, res) => {
  clothes.push(req.file.filename);
  res.json({ success: true, filename: req.file.filename });
});

app.get('/clothes', (req, res) => {
  res.json(clothes);
});

app.delete('/clothes/:filename', (req, res) => {
  const { filename } = req.params;
  fs.unlinkSync(path.join(__dirname, 'uploads', filename));
  clothes = clothes.filter(f => f !== filename);
  res.json({ success: true });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
