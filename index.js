import express from 'express';
import indexRoutes from './routes/index.routes.js';
import itemsRoutes from './routes/items.routes.js';
import loginRoutes from './routes/login.routes.js';
import items2Routes from './routes/items2.routes.js';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from "./utils/mongodb.js";

const app = express();

connectDB();

app.use(indexRoutes);
app.use(itemsRoutes);
app.use(items2Routes);
app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(loginRoutes);

app.listen(3011, () => console.log('http://localhost:3011'));

console.log("Hello World");