import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentPrediction from './pages/student/StudentPrediction';
import StudentImprovementPlan from './pages/student/StudentImprovementPlan';
import StudentReports from './pages/student/StudentReports';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherUpload from './pages/teacher/TeacherUpload';
import TeacherAnalytics from './pages/teacher/TeacherAnalytics';
import TeacherStudents from './pages/teacher/TeacherStudents';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAudit from './pages/admin/AdminAudit';
import AdminUsers from './pages/admin/AdminUsers';
import SystemMonitor from './pages/sysadmin/SystemMonitor';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Student Routes */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="prediction" element={<StudentPrediction />} />
            <Route path="improvement-plan" element={<StudentImprovementPlan />} />
            <Route path="reports" element={<StudentReports />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="upload" element={<TeacherUpload />} />
            <Route path="analytics" element={<TeacherAnalytics />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="audit" element={<AdminAudit />} />
            <Route path="users" element={<AdminUsers />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* System Admin Routes */}
          <Route path="/sysadmin" element={
            <ProtectedRoute allowedRoles={['sysadmin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="monitor" element={<SystemMonitor />} />
            <Route index element={<Navigate to="monitor" replace />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
