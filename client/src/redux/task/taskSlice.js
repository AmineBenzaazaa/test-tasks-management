import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:3000/api/tasks/";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `${token}`,
  },
});

export const getTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (error) {
    throw new Error("Error fetching tasks:", error);
  }
});

export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  try {
    const response = await axiosInstance.post("create", taskData);
    return response.data; // Return the newly added task data
  } catch (error) {
    throw new Error("Error adding task:", error);
  }
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskData }) => {
    try {
      const response = await axiosInstance.post(`update/${taskId}`, taskData);
      return response.data; // Return the updated task data
    } catch (error) {
      throw new Error("Error updating task:", error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      await axiosInstance.delete(`delete/${taskId}`);
      return taskId; // Return the deleted task ID
    } catch (error) {
      throw new Error("Error deleting task:", error);
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: {
    [getTasks.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getTasks.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    [getTasks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload); // Add the newly added task to the state
    },
    [addTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateTask.fulfilled]: (state, action) => {
      state.loading = false;
      // Update the task in the state with the updated task data
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    },
    [updateTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.loading = false;
      // Remove the deleted task from the state
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    [deleteTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default taskSlice.reducer;
