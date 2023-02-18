import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware';
import nodeRouter from './modules/node/node.route';
import edgeRouter from './modules/edge/edge.route';
import moduleRouter from './modules/module/module.route';
import scriptRouter from './modules/script/script.route';
import dashboardRouter from './modules/dashboard/dashboard.route';
import panelRouter from './modules/panel/panel.route';

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
app.use(scriptRouter);
app.use(dashboardRouter);
app.use(panelRouter);
app.use(errorMiddleware);

app.listen(port);
console.info('App is listening on port:', port);
