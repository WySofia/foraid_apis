import { app } from './app';
import { authRouter } from './routes/auth.routes';

app.listen(3000);
app.use(authRouter);
