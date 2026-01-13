// frontend/src/components/AuthModal.tsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginApi, registerApi } from "../api/auth.api";

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLoginView) {
        const res = await loginApi(email, password);
        login(res.data.token);
      } else {
        await registerApi(name, email, password);
        alert("Registration successful! Please log in.");
        setIsLoginView(true); // Switch to login view after registration
      }
    } catch (err: any) { // Add 'any' type to access response data
      // Check if the error has a detailed response from our backend
      if (err.response && err.response.data && err.response.data.details) {
        // Join the specific error messages from the backend
        const messages = err.response.data.details.map((d: any) => d.message).join(', ');
        setError(messages);
      } else {
        // Fallback to a generic message
        setError(isLoginView ? "Invalid email or password." : "User may already exist.");
      }
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLoginView ? "Welcome Back" : "Create Your Account"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <input
              className="border p-2 w-full mb-3 rounded-md"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            className="border p-2 w-full mb-3 rounded-md"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border p-2 w-full mb-6 rounded-md"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="bg-black text-white w-full p-2 rounded-md font-semibold">
            {isLoginView ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLoginView(!isLoginView)} className="text-blue-500 hover:underline font-semibold">
            {isLoginView ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}