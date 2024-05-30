import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { BrowserRouter } from "react-router-dom"; // Utilisez BrowserRouter au lieu de RouterProvider
import { createRouter } from "./router";
import {Header} from "./components/Header"; // Importez votre composant Header
import { Routes, Route } from "react-router-dom"; // Importez Routes et Route pour définir les routes
import Athletes from "./pages/athletes";
import Classement from "./pages/classement";
import {Predictions} from "@/pages/Predictions.tsx";
import Home from "./pages";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [router] = useState(() => createRouter());

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter> 
        <Header /> 
        <Routes> 
          <Route path="/" element={<Home />} />
          {/* <Route path="/visualisation" element={<Visualisation />} />
          <Route path="/predictions" element={<Predictions />} /> */}
          <Route path="/athletes" element={<Athletes />} />
            <Route path="/predictions" element={<Predictions />} />
          <Route path="/classement" element={<Classement />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
