import React, { useState, useEffect } from "react";
import TaskList from "./TaskListComponent";
import TaskForm from "./TaskFormComponent";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Función para obtener tareas
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:4000/api/task");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Task Manager</h1>

      <div className="flex justify-between mb-4">
        {tasks.length === 0 ? (
          <p>Actualmente no tienes tareas creadas</p>
        ) : (
          <p>Tienes {tasks.length} tareas</p>
        )}
        <button
          onClick={() => setEditingTaskId("new")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Nueva tarea
        </button>
      </div>

      {editingTaskId === "new" && (
        <TaskForm fetchTasks={fetchTasks} setEditingTaskId={setEditingTaskId} />
      )}

      <TaskList
        tasks={tasks}
        setEditingTaskId={setEditingTaskId}
        editingTaskId={editingTaskId}
        fetchTasks={fetchTasks}
      />
    </div>
  );
}

export default App;
