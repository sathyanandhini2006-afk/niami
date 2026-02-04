// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ToastProvider } from './context/ToastContext';
import { PrivateRoute } from './components/layout/PrivateRoute';
import { Layout } from './components/layout/Layout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { TaskListPage } from './pages/Tasks/TaskListPage';
import { CreateTaskPage } from './pages/Tasks/CreateTaskPage';
import { EditTaskPage } from './pages/Tasks/EditTaskPage';
import { TaskDetailsPage } from './pages/Tasks/TaskDetailsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CalendarPage } from './pages/CalendarPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { HelpPage } from './pages/HelpPage';
import { WhiteboardPage } from './pages/WhiteboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { EmojiLock } from './components/auth/EmojiLock';
import { useAuth } from './context/AuthContext';

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>
      <ToastProvider>
        <AuthProvider>
          <AuthWrapper>
            <TaskProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route element={<Layout><DashboardPage /></Layout>} path="/dashboard" />
                  <Route element={<Layout><TaskListPage /></Layout>} path="/tasks" />
                  <Route element={<Layout><CreateTaskPage /></Layout>} path="/tasks/create" />
                  <Route element={<Layout><EditTaskPage /></Layout>} path="/tasks/edit/:id" />
                  <Route element={<Layout><TaskDetailsPage /></Layout>} path="/tasks/:id" />
                  <Route element={<Layout><CategoriesPage /></Layout>} path="/categories" />
                  <Route element={<Layout><CalendarPage /></Layout>} path="/calendar" />
                  <Route element={<Layout><AnalyticsPage /></Layout>} path="/analytics" />
                  <Route element={<Layout><WhiteboardPage /></Layout>} path="/whiteboard" />
                  <Route element={<Layout><ProfilePage /></Layout>} path="/profile" />
                  <Route element={<Layout><HelpPage /></Layout>} path="/help" />
                </Route>

                {/* 404 */}
                <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
              </Routes>
            </TaskProvider>
          </AuthWrapper>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLocked } = useAuth();

  if (isLocked) {
    return <EmojiLock mode="unlock" />;
  }

  return <>{children}</>;
};

export default App;
