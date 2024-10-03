import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const LoginwWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Login />
      </GoogleOAuthProvider>
    );
  };
  return (
    <Routes>
      <Route exact path="/" element={<LoginwWrapper />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
