import express from "express";
import dotenv from "dotenv";
import conectarDB from './config/db.js';
import router from './routes/taskRoutes.js'

const app = express();
dotenv.config();

conectarDB();

// Middleware para interpretar JSON
app.use(express.json());

app.use('/api/task', router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`Servidor funcionando desde el puerto ${PORT}`);
});