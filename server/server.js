require('dotenv').config();
const express = require('express');
const app = express();
const ConnectDB = require('./db');
const cors = require('cors');
const router = require('./router');
const PORT = process.env.PORT || 8080;
const ErrorHandler = require('./middleware/errorHandler');
const NotFound = require('./middleware/not-found');

ConnectDB();
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(ErrorHandler);
app.use(NotFound);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
