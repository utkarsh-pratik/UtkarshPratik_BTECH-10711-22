// frontend/src/components/AuthModal.tsx
import { useState } from "react";
import toast from "react-hot-toast"; // <-- Import toast
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
  // We no longer need the 'error' state, toast will handle it.
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const promise = isLoginView
      ? loginApi(email, password)
      : registerApi(name, email, password);

    try {
      const res = await promise;
      if (isLoginView) {
        login(res.data.token);
        toast.success("Logged in successfully!");
      } else {
        toast.success("Registration successful! Please log in.");
        setIsLoginView(true); // Switch to login view
      }
    } catch (err: any) {
      const message = err.response?.data?.details?.[0]?.message ||
                      (isLoginView ? "Invalid email or password." : "User may already exist.");
      toast.error(message);
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
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border p-2 w-full mb-6 rounded-md"
            placeholder="Password"
            type="password"
            autoComplete={isLoginView ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="bg-primary text-white w-full p-2 rounded-md font-semibold hover:bg-primary-hover">
            {isLoginView ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLoginView(!isLoginView)} className="text-primary hover:underline font-semibold">
            {isLoginView ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}