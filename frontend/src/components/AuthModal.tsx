// frontend/src/components/AuthModal.tsx
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { loginApi, registerApi } from "../api/auth.api";
import { useAnimatedModal } from "../hooks/useAnimatedModal";
import { Lock, UserPlus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isRendered, handleClose } = useAnimatedModal(isOpen, onClose);
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        onClose(); // Close modal on successful login
      } else {
        toast.success("Registration successful! Please log in.");
        setIsLoginView(true);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.details?.[0]?.message ||
        (isLoginView ? "Invalid email or password." : "User may already exist.");
      toast.error(message);
      console.error(err);
    }
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 bg-neutral-900/70 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <motion.div
        className={clsx(
          "bg-white dark:bg-neutral-800 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden",
          "transition-all duration-300 ease-in-out",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        {/* Gradient Header */}
        <div className="bg-gradient-to-br from-primary-500 to-indigo-600 p-8 text-white text-center">
          <div className="inline-block bg-white/20 p-3 rounded-full mb-4">
            {isLoginView ? <Lock /> : <UserPlus />}
          </div>
          <h2 className="text-3xl font-bold">
            {isLoginView ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-primary-100 mt-1">
            {isLoginView
              ? "Enter your credentials to access your board."
              : "Let's get you started!"}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {!isLoginView && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">Name</label>
                    <input
                      className="w-full px-4 py-2 border bg-transparent border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">Email</label>
              <input
                className="w-full px-4 py-2 border bg-transparent border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">Password</label>
              <input
                className="w-full px-4 py-2 border bg-transparent border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                placeholder="••••••••"
                type="password"
                autoComplete={isLoginView ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
            >
              {isLoginView ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="font-semibold text-primary-500 hover:text-primary-600 hover:underline"
            >
              {isLoginView ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
