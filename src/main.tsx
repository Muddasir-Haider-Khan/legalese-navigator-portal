
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Get the publishable key from environment variables or use a dummy key for development
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_dummy-key-for-development";

// Only show warning instead of throwing error
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  console.warn("⚠️ No Clerk Publishable Key found. Authentication features will be limited. Set VITE_CLERK_PUBLISHABLE_KEY in your environment for full functionality.");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
