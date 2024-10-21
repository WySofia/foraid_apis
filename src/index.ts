import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { app } from './app';
import { authRouter } from './routes/auth.routes';
import { casosRouter } from './routes/casos.routes';

const openapi = YAML.load('./docs/openapi.yaml');
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use('/api/v1/', authRouter);
app.use('/api/v1/', casosRouter);
app.listen(3000);
