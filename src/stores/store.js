import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userStateStore from "./userStateStore";
import staffAppraisalSlice from "./staffAppraisalStore";
import appraisal from "./appraisalStore";
import comments from "./commentStore";
import department from "./departmentStore";

// Persist configuration
const persistConfig = {
  key: "auth", // Key to store in localStorage
  storage, // Use localStorage as storage
  whitelist: ["user", "token"], // Only persist specific fields
};

// Create a persisted reducer for user authentication state
const persistedAuthReducer = persistReducer(persistConfig, userStateStore);

// Configure store with middleware adjustments
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Persisted reducer
    staffAppraisal: staffAppraisalSlice,
    appraisal,
    comment: comments,
    department,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore persist actions
      },
    }),
});

// Persistor for managing persisted state
const persistor = persistStore(store);

export { store, persistor };
