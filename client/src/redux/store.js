import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import taskReducer from './task/taskSlice.js'; // Import the task slice
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Include the task reducer in the root reducer
const rootReducer = combineReducers({ 
  user: userReducer,
  task: taskReducer, // Add the task slice
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // Whitelist both user and task slices for persisting
  whitelist: ['user', 'task'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
