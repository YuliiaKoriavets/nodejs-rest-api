require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/api/contacts');
const { required } = require('joi');

const DB_URI = process.env.DB_URI;
const NODE_ENV = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 3000;

const app = express();

const formatsLogger = NODE_ENV === 'dev' ? 'dev' : 'short';;

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.use('/api/contacts', router);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const connection = mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful`)
    })
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`),
  )

// const startServer = async () => {
//   try {
//     await mongoose.connect(DB_URI);
//     app.listen(PORT, () => {
//       console.log('Database connection successful');
//     });
//   } catch (error) {
//     console.log(`Server not running. Error message: ${error.message}`);
//     process.exit(1);
//   }
// };

// startServer()

