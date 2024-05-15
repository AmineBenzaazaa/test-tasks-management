import Task from "../models/task.model.js";


// Read Tasks by User
export async function getTasksByUser(req, res, next) {
  try {
    const userId = req.user.id;

    if (!userId) {
      throw new Error("User ID is required");
    }

    const tasks = await Task.find({ user_id: userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}


// create tasks
export async function createTask(req, res, next) {
  try {
    console.log('userId :>> ', req.user.id);
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || !userId) {
      throw new Error("Title and user ID are required");
    }

    const task = new Task({
      title,
      description,
      user_id: userId,
    });

    const savedTask = await task.save();
    res.status(201).json({ success: true, message: 'Task created successfully', data: savedTask });
  } catch (error) {
    next(error);
  }
}

// Update Task
export async function updateTask(req, res, next) {
  try {
    console.log('req.body :>> ', req);
    const taskId = req.params.id;
    console.log('taskId :>> ', taskId);
    const updates = req.body;

    if (!taskId) {
      throw new Error("Task ID is required");
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    res.json({ success: true, message: 'Task updated successfully', data: updatedTask });
  } catch (error) {
    next(error);
  }
}

// Delete Task
export async function deleteTask(req, res, next) {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      throw new Error("Task ID is required");
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      throw new Error("Task not found");
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
}
