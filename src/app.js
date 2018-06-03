// @flow
import type {NextFunction, $Request, $Response} from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './router';

export const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.use((req: $Request, res: $Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/', router);
