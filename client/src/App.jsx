import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { Layout } from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { Concepts } from './pages/Concepts';
import { Dashboard } from './pages/Dashboard';
import { ForgotPassword } from './pages/ForgotPassword';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { ProtectedRoute } from './routes/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/concepts" element={<Concepts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
