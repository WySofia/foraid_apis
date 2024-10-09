import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// temp routes to test connection
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' + error });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {});
