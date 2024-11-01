import React, { useState, useEffect } from "react";

function TaskForm({ fetchTasks, setEditingTaskId, editingTask = null }) {
  const [title, setTitle] = useState(editingTask ? editingTask.title : "");
  const [description, setDescription] = useState(
    editingTask ? editingTask.description : ""
  );

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description };

    if (editingTask) {
      await fetch(`http://localhost:4000/api/task/${editingTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
    } else {
      await fetch("http://localhost:4000/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
    }

    setTitle("");
    setDescription("");
    setEditingTaskId(null);
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 bg-white rounded shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="border p-1 w-full mb-2 rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="border p-1 w-full mb-2 rounded"
        required
      ></textarea>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => setEditingTaskId(null)}
          className="bg-gray-300 p-1 rounded"
        >
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 text-white p-1 rounded">
          Guardar
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
