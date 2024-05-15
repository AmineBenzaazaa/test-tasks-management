import React, { useState, useEffect } from "react";

export default function TaskModal({ onClose, onSubmit, initialTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (initialTask) {
      setFormData(initialTask);
    } else {
      setFormData({ title: "", description: "", status: "" });
    }
  }, [initialTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md max-w-xl">
        <h2 className="text-lg font-semibold mb-4">
          {initialTask ? "Edit Task" : "Add Task"}
        </h2>
        <p className="text-sm text-gray-500 ">
          Add a new Task to your Task Manager here. Click save when you are
          done.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          {initialTask && (
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-200 text-sm text-gray-800 px-4 py-1 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-900 text-sm text-white px-4 py-1 rounded-md"
            >
              {initialTask ? "Update" : "Save task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
