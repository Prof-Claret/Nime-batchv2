import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Episode from "./pages/Episode";
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import AnimeForm from "./pages/Admin/AnimeForm";
import EpisodeForm from "./pages/Admin/EpisodeForm";
import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:slug" element={<Detail />} />
        <Route path="/episode/:id" element={<Episode />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/admin/anime/new" element={<ProtectedRoute><AnimeForm /></ProtectedRoute>} />
        <Route path="/admin/anime/:id/episodes/new" element={<ProtectedRoute><EpisodeForm /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
