import helmet from 'helmet';
import { app } from './app';

app.use(helmet.hidePoweredBy());
