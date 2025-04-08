"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // Ensure you have initialized Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase signIn method

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Store error message

  useEffect(() => {
    // If user is already logged in, redirect to home page
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/home");
    }
  }, [router]);

  // Handle the login process
  const handleLogin = async () => {
    try {
      // Firebase sign-in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // On successful login, store the user info in localStorage
      localStorage.setItem("user", user.uid); // Store the user UID (or any other info you need)

      // Redirect to homepage after successful login
      router.push("/home");
    } catch (err) {
      // Handle login errors
      setError("Failed to log in. Please check your credentials and try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}
