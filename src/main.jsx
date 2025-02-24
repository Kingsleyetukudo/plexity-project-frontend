import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./stores/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { register } from "./serviceWorkerRegistration.js";

const loadRecaptchaScript = () => {
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const Root = () => {
  useEffect(() => {
    loadRecaptchaScript()
      .then(() => {
        console.log("reCAPTCHA script loaded successfully");
      })
      .catch((error) => {
        console.error("Failed to load reCAPTCHA script:", error);
      });
  }, []); // Empty dependency array ensures this runs only once, when the component mounts

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
