// frontend/src/App.tsx
import { Toaster } from "react-hot-toast"; // <-- Import Toaster
import AuthProvider, { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function AppContent() {
  const { token } = useAuth();
  return token ? <Dashboard /> : <LandingPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="bottom-right" /> {/* <-- Add the Toaster component */}
    </AuthProvider>
  );
}

export default App;