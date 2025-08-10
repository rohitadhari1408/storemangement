import { useState } from 'react';
import {  Router, Routes, Route } from "react-router-dom";
import AppLayout from '../src/componets/layout/AppLayout';
import { SidebarProvider } from './componets/context/SidebarContext';
import LoginPage from '../src/pages/Login';
import Home from './pages/Home';
import DashboardRoute from './route/DashboardRoute';
import Signup from '../src/pages/Signup';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
function App() {


  return (
    <>
      <SidebarProvider>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />

            {/* Protected Routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard/*" element={<DashboardRoute />} />
            </Route>

          </Routes>

      </SidebarProvider>
    </>
  )
}

export default App
