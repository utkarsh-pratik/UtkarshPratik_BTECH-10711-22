// frontend/src/App.tsx
import { Toaster } from "react-hot-toast";
import AuthProvider, { useAuth } from "./context/AuthContext"; // <-- Import useAuth
import { ThemeProvider } from "./context/ThemeContext"; // <-- Import ThemeProvider
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function AppContent() {
  const { token } = useAuth(); // <-- ERROR: useAuth is not defined here
  return token ? <Dashboard /> : <LandingPage />;
}

function App() {
  return (
    <ThemeProvider> {/* <-- Wrap with ThemeProvider */}
      <AuthProvider>
        <AppContent />
        <Toaster position="bottom-right" /> {/* <-- Add the Toaster component */}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;