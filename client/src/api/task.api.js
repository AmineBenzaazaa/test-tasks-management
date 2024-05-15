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

// Async action creator to fetch tasks
export const getTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (error) {
    throw new Error("Error fetching tasks:", error);
  }
});

// Async action creator to add a task
export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  try {
    await axiosInstance.post("create", taskData);
  } catch (error) {
    throw new Error("Error adding task:", error);
  }
});

// Async action creator to update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskData }) => {
    console.log("taskId, taskData :>> ", taskId, taskData);
    try {
      await axiosInstance.post(`update/${taskId}`, taskData);
    } catch (error) {
      throw new Error("Error updating task:", error);
    }
  }
);

// Async action creator to delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      await axiosInstance.delete(`delete/${taskId}`);
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
    [addTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteTask.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default taskSlice.reducer;
