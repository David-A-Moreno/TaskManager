import React from "react";
import TaskForm from "./TaskFormComponent";

function TaskList({ tasks, setEditingTaskId, editingTaskId, fetchTasks }) {
  // Función para eliminar una tarea
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/task/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  // Función para actualizar el estado de la tarea (pendiente/completada)
  const toggleStatus = async (task) => {
    const updatedStatus = task.status === "pendiente" ? "completada" : "pendiente";
    await fetch(`http://localhost:4000/api/task/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, status: updatedStatus }),
    });
    fetchTasks();
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) =>
        editingTaskId === task._id ? (
          <TaskForm
            key={task._id}
            fetchTasks={fetchTasks}
            setEditingTaskId={setEditingTaskId}
            editingTask={task}
          />
        ) : (
          <div
            key={task._id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded shadow"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.status === "completada"}
                onChange={() => toggleStatus(task)}
                className="mr-2"
              />
              <div>
                <h3 className={`font-bold text-blue-700 ${task.status === "completada" ? "line-through text-gray-500" : ""}`}>
                  {task.title}
                </h3>
                <p>{task.description}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingTaskId(task._id)}
                className="p-1"
              >
                <img src="/edit.png" alt="Edit" className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="p-1"
              >
                <img src="/delete.png" alt="Delete" className="w-5 h-5" />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default TaskList;
