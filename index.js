import express from 'express';
import indexRoutes from './routes/index.routes.js';
import itemsRoutes from './routes/items.routes.js';

const app = express();

app.use(indexRoutes);
app.use(itemsRoutes);

app.listen(3011, () => console.log('http://localhost:3011'));

console.log("Hello World");