require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const Person = require('./models/persons');

app.use(express.json());
app.use(cors());

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});
const upload = multer({ storage: storage, filefilter: filefilter });






app.post('/api/persons', upload.single('photo'), (req, res) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
    photo:
      req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename,
  });
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => console.log(err.message));
});


app.get( '/api/persons' , (req, res) => {
  Person. find({})
    .then ( ( Personen) => {
      res.json(Personen);
    })
    .catch ( (err) => console. log(err . message));
});

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));






const PORT = process.env.PORT;
app.listen(PORT);
