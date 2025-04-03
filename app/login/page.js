"use client";
import "../globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to home page
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}
