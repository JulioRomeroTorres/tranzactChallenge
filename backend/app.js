import express from "express";
import morgan from 'morgan';
import myrouter from './routes/router.js';

const app = express();

app.set("port",3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(myrouter);

export default app;