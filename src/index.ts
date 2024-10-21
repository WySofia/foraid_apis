import { app } from './app';
import { authRouter } from './routes/auth.routes';
import { casosRouter } from './routes/casos.routes';

app.listen(3000);
app.use(authRouter);
app.use(casosRouter);
