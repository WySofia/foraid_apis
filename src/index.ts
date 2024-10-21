import { app } from './app';
import { authRouter } from './routes/auth.routes';
import { casosRouter } from './routes/casos.routes';

app.use(authRouter);
app.use(casosRouter);
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
    console.log('Documentación disponible en http://localhost:3000/api-docs');
});
