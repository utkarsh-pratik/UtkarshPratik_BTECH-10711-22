// frontend/src/App.tsx
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
    </AuthProvider>
  );
}

export default App;