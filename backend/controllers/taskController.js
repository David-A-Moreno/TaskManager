import Task from '../models/TaskModel.js';
 
// Crear Tarea
export const crearTarea = async (req, res) => {
    try {
        const tarea = new Task(req.body);
        await tarea.save();
        res.status(201).json(tarea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener Todas las Tareas
export const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Task.find();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener Tarea por ID
export const obtenerTareaPorId = async (req, res) => {
    try {
        const tarea = await Task.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar Tarea
export const actualizarTarea = async (req, res) => {
    try {
        const tareaActualizada = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tareaActualizada) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar Tarea
export const eliminarTarea = async (req, res) => {
    try {
        const tareaEliminada = await Task.findByIdAndDelete(req.params.id);
        if (!tareaEliminada) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};