import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import nodeRouter from './node/node.route';
import errorMiddleware from './middlewares/error.middleware'

const port = 3003;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

app.use(nodeRouter);
app.use(errorMiddleware);

app.listen(port);
console.info('App is listening on port:', port);
