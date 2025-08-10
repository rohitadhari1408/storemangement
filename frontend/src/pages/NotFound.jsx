// src/pages/NotFound.jsx
import React from "react";

export default function NotFound() {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-lg mt-2">Oops! The page you are looking for does not exist.</p>
    </div>
    </>
  );
}
