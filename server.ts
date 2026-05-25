import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import errorHandler from './_middleware/error-handler';
import accountsController from './accounts/accounts.controller';
import swaggerDocs from './_helpers/swagger';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// Serve swagger-ui static assets
app.use('/api-docs', express.static(path.join(__dirname, '../node_modules/swagger-ui-dist')));

app.use('/accounts', accountsController);
app.use('/api-docs', swaggerDocs);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  const port = 4000;
  app.listen(port, () => console.log('Server listening on port ' + port));
}

export default app;