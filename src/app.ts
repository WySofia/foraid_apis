import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet.hidePoweredBy());
