import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware';
import nodeRouter from './modules/node/node.route';
import edgeRouter from './modules/edge/edge.route';
import moduleRouter from './modules/module/module.route';

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
app.use(edgeRouter);
app.use(moduleRouter);
app.use(errorMiddleware);

app.listen(port);
console.info('App is listening on port:', port);
