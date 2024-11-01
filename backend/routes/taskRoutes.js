import express from 'express';
import { 
    crearTarea, 
    obtenerTareas, 
    obtenerTareaPorId, 
    actualizarTarea, 
    eliminarTarea 
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/', crearTarea);
router.get('/', obtenerTareas);
router.get('/:id', obtenerTareaPorId);
router.put('/:id', actualizarTarea);
router.delete('/:id', eliminarTarea);

export default router;
 