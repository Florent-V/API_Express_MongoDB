import dotenv from 'dotenv';
import app from './src/app.js';
import { errorHandler, normalizePort } from './src/utils.js';

dotenv.config();

const PORT = normalizePort(process.env.APP_PORT || '5000');

app.listen(PORT, (err) => {
  if (err) {
    errorHandler(err);
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${PORT}`);
  }
});
