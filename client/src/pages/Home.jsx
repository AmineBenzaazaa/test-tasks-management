import React, { useState, useEffect } from "react";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../redux/task/taskSlice";
import AddTaskModal from "../components/TasksModal";
import EditTaskModal from "../components/EditTaskModal";

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const toggleModal = () => {
    setShowAddModal(!showAddModal);
    setSelectedTask(null); // Reset selectedTask when toggling modal
  };

  const handleAddTask = (taskData) => {
    dispatch(addTask(taskData))
      .then(() => dispatch(getTasks()))
      .catch((error) => console.error("Error adding task:", error));
    setShowAddModal(false);
  };

  const handleUpdateTask = (taskData) => {
    dispatch(updateTask({ taskId: selectedTask._id, taskData }))
      .then(() => dispatch(getTasks()))
      .catch((error) => console.error("Error updating task:", error));
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId))
      .then(() => dispatch(getTasks()))
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="px-4 py-20 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
            Welcome to Task Manager
          </h1>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">All The Tasks</h2>
            <button
              className="bg-gray-900 text-white px-4 py-1 text-sm rounded-md"
              onClick={() => {
                setSelectedTask(null);
                toggleModal();
              }}
            >
              Add Task
            </button>
          </div>
          <div>
            {tasks.map((task) => (
              <div
                key={task._id}
                className="border-b bg-white rounded-md m-2 p-4"
              >
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      task.status === "completed"
                        ? "text-green-600 bg-green-200"
                        : "text-yellow-600 bg-yellow-200"
                    }`}
                  >
                    {task.status}
                  </span>
                  <div className="space-x-5 ">
                    <button
                      className=""
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      <TrashIcon className="w-5 h-5 text-red-500 hover:bg-red-50 rounded-sm" />
                    </button>
                    <button onClick={() => handleEditTask(task)}>
                      <Pencil2Icon className="w-5 h-5  text-blue-500 hover:bg-blue-50 rounded-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showAddModal && (
            <AddTaskModal
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAddTask}
            />
          )}
          {showEditModal && (
            <EditTaskModal
              onClose={() => setShowEditModal(false)}
              onSubmit={handleUpdateTask}
              initialTask={selectedTask}
            />
          )}
        </div>
      )}
    </div>
  );
}
