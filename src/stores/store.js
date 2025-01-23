import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userStateStoe from "./userStateStore";
import staffAppraisalSlice from "./staffAppraisalStore";
import appraisal from "./appraisalStore";

// Persist configuration
const persistConfig = {
  key: "auth", // Key to store in localStorage
  storage, // Specify storage mechanism (localStorage in this case)
  whitelist: ["user", "token"], // Only persist specific fields from the state
};

// Create a persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, userStateStoe);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    staffAppraisal: staffAppraisalSlice,
    appraisal: appraisal,
  },
});

// Persistor for use in the app
const persistor = persistStore(store);

export { store, persistor };
