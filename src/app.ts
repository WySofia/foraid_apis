import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet.hidePoweredBy());
app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
