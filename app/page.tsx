"use client"; // Enables client-side rendering

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login after 2 seconds
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer when component unmounts
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to Health Analysis App</h1>
      <p className="text-lg mt-2">Redirecting to login...</p>
    </div>
  );
}
