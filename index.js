import express from 'express';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(indexRoutes);

app.listen(3001, () => console.log('http://localhost:3001'));

console.log("Hello World");