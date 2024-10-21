import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export const app = express();
const openapi = YAML.load('./docs/openapi.yaml');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet.hidePoweredBy());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
