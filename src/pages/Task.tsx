import React, { useState, useEffect } from "react";
import { getTasks, addTask, deleteTask } from "../services/tasks";
import { Task as TypeTask } from "../types";
import { formatDateToLocal } from "../utils";

const Task = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<TypeTask[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTasks();
      setTasks(result);
    };

    fetchData();
  }, []);

  const addTaskInfo = async () => {
    const newTask = await addTask(task);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTask("");
  };

  const deleteTaskInfo = async (id?: number) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    const result = await deleteTask(id);
    if (result) {
      setTasks((prevTasks) => prevTasks.filter((task) => task?.id !== id));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskInfo();
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 rounded-md px-4 py-2 mr-2"
        />
        <button
          onClick={addTaskInfo}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
        >
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task?.id}
            className="border-b border-gray-300 py-2 flex items-center"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
          >
            <div className="text-lg font-bold mr-4">{task?.description}</div>
            <div className="text-gray-500 text-sm mr-4">
              {formatDateToLocal(task?.created_at)}
            </div>
            <div>
              <button
                onClick={() => deleteTaskInfo(task?.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
