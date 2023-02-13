import express, {Request, Response} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const port = 3003;
const app = express();

app.use(cors());
app.use(helmet());

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong');
});

app.get('/prisma', async (req: Request, res: Response) => {
    const result = await prisma.node.create({
        data: {
            ip: '123',
            name: '123',
            info: '1234'
        }
    });
    res.send(result);
});


app.listen(port);
console.info('App is listening on port:', port);