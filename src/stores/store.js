import { configureStore } from "@reduxjs/toolkit";
import userStateStoe from "./userStateStore";

const store = configureStore({
  reducer: {
    auth: userStateStoe,
  },
});

export default store;
