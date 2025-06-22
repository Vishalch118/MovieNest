import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    // Debug logging
    console.log("API URL:", process.env.REACT_APP_API_URL);
    console.log("Full URL:", `${process.env.REACT_APP_API_URL}/api/auth/signup`);
    
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/signup`;
      console.log("Making request to:", url);
      
      const res = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);
      console.log("Response headers:", res.headers);
      
      // Get the raw response text first
      const responseText = await res.text();
      console.log("Raw response text:", responseText);
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed JSON data:", data);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Token saved successfully");
        setMessage("Account created! Redirecting...");
        setTimeout(() => navigate("/"), 1000);
      } else {
        console.log("Signup failed:", data);
        setMessage(data.msg || data.message || "Sign up failed");
      }
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error name:", err.name);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-400 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-red-500">{message}</div>
        )}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
