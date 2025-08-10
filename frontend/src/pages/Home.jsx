import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Home = () => {

  return (
    <>
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Our App</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your journey starts here. Let’s get you set up!
        </p>
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
    </>

  );
};

export default Home;
