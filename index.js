import express from 'express';
import indexRoutes from './routes/index.routes.js';
import itemsRoutes from './routes/items.routes.js';
import loginRoutes from './routes/login.routes.js';
// import items2Routes from './routes/items2.routes.js';
import cors from 'cors';
import morgan from 'morgan';
// import { connectDB } from "./utils/mongodb.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// connectDB();

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Add a route to serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

// Add a route to serve the success page
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'success.html'));
});

app.use(express.json());
app.use(cors());
app.use(morgan());

// Mount login routes at /login
app.use('/login', loginRoutes);

app.use(indexRoutes);
app.use(itemsRoutes);
// app.use(items2Routes);

app.listen(3011, () => console.log('http://localhost:3011'));

console.log("Hello World");