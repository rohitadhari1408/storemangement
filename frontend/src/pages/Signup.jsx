import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SignupForm from "../componets/forms/SignupForm";

const Signup = () => {

     useEffect(() => {
        localStorage.clear(); // Clear local storage on component mount
  }, []);

  return (

    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <SignupForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Signup;
