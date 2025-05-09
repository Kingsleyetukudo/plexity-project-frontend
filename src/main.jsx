import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./stores/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { register } from "./serviceWorkerRegistration.js";

const Root = () => {
  return <App />;
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <StrictMode>
        <Root />
      </StrictMode>
    </PersistGate>
  </Provider>
);

register();
