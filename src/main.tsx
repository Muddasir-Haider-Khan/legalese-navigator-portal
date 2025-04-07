
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Use the provided publishable key
const PUBLISHABLE_KEY = "pk_test_c2FmZS1kb25rZXktMzguY2xlcmsuYWNjb3VudHMuZGV2JA";

// We're using a hardcoded key so no need for this warning now
// if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
//   console.warn("⚠️ No Clerk Publishable Key found. Authentication features will be limited. Set VITE_CLERK_PUBLISHABLE_KEY in your environment for full functionality.");
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
