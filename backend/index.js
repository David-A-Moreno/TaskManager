import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from './config/db.js';
import router from './routes/taskRoutes.js'

const app = express();
dotenv.config();

conectarDB();

const dominiosPermitidos = ['http://localhost:5173'];

const corsOptions = {
    origin: function(origin,callback) {
        if (dominiosPermitidos.indexOf(origin)!== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions));

// Middleware para interpretar JSON
app.use(express.json());

app.use('/api/task', router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`Servidor funcionando desde el puerto ${PORT}`);
});