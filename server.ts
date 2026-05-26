import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import errorHandler from './_middleware/error-handler';
import accountsController from './accounts/accounts.controller';
import swaggerDocs from './_helpers/swagger';
import { dbReady } from './_helpers/db';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// Wait for DB before handling requests
app.use(async (req: any, res: any, next: any) => {
    await dbReady;
    next();
});

// Serve swagger-ui static assets
app.use('/api-docs', express.static(path.join(__dirname, '../node_modules/swagger-ui-dist')));

app.use('/accounts', accountsController);
app.use('/api-docs', swaggerDocs);
app.use(errorHandler);

// Listen on PORT for Render, fallback to 4000 for local
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server listening on port ' + port));

export default app;