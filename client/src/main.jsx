import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.jsx";

// Opretter en ny QueryClient-instance
const queryClient = new QueryClient();

// Renderer rodkomponenten med ReactDOM
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode sikrer at visse advarsler bliver udløst i udviklingsmiljøet
  <React.StrictMode>
    {/* QueryClientProvider giver React Query funktionalitet til alle underliggende komponenter */}
    <QueryClientProvider client={queryClient}>
      {/* AuthProvider giver autentificeringskontekst til alle underliggende komponenter */}
      <AuthProvider>
        {/* Hovedkomponenten for din applikation, indlejret i de nødvendige providere */}
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);