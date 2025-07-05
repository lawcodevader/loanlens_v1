import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { roles } from './constants/roles';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteProfile from './pages/auth/CompleteProfile';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Portfolio from './pages/admin/Portfolio';
import UserManagement from './pages/admin/UserManagement';
import Settings from './pages/admin/Settings';
import ChecklistManager from './pages/admin/ChecklistManager';
import TemplateManager from './pages/admin/TemplateManager';
import Workflow from './pages/admin/Workflow';
import Reports from './pages/admin/Reports';
import ETSRBeta from './pages/admin/DataUpload';

// Borrower Pages
import DocumentUpload from './pages/borrower/DocumentUpload';

// External User Pages
import VerificationForm from './pages/external/VerificationForm';
import AdvocatePanel from './pages/advocate/AdvocatePanel';

import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
          </Route>

          {/* Main App Routes */}
          <Route element={<ProtectedRoute allowedRoles={[roles.ADMIN, roles.ADVOCATE]} />}>
            <Route element={<MainLayout />}>
              {/* Admin Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/workflow" element={<Workflow />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/checklist-manager" element={<ChecklistManager />} />
              <Route path="/settings/template-manager" element={<TemplateManager />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/etsr" element={<ETSRBeta />} />
              
              {/* Advocate Routes */}
              <Route path="/advocate-panel" element={<AdvocatePanel />} />
            </Route>
          </Route>

          {/* Borrower Routes */}
          <Route element={<ProtectedRoute allowedRoles={[roles.BORROWER]} />}>
            <Route element={<MainLayout />}>
              <Route path="/documents" element={<DocumentUpload />} />
            </Route>
          </Route>

          {/* External User Routes */}
          <Route path="/verification/:token" element={<VerificationForm />} />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;