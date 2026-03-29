import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
// import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" richColors />
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <Analytics /> */}
  </StrictMode>,
);
