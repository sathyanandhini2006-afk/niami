// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './logic/context/AuthContext';
import { TaskProvider } from './logic/context/TaskContext';
import { ToastProvider } from './logic/context/ToastContext';
import { PrivateRoute } from './ui/components/layout/PrivateRoute';
import { Layout } from './ui/components/layout/Layout';

// Pages
import { LandingPage } from './ui/pages/LandingPage';
import { LoginPage } from './ui/pages/Auth/LoginPage';
import { RegisterPage } from './ui/pages/Auth/RegisterPage';
import { DashboardPage } from './ui/pages/DashboardPage';
import { TaskListPage } from './ui/pages/Tasks/TaskListPage';
import { CreateTaskPage } from './ui/pages/Tasks/CreateTaskPage';
import { EditTaskPage } from './ui/pages/Tasks/EditTaskPage';
import { TaskDetailsPage } from './ui/pages/Tasks/TaskDetailsPage';
import { CategoriesPage } from './ui/pages/CategoriesPage';
import { CalendarPage } from './ui/pages/CalendarPage';
import { AnalyticsPage } from './ui/pages/AnalyticsPage';
import { ProfilePage } from './ui/pages/ProfilePage';
import { HelpPage } from './ui/pages/HelpPage';
import { WhiteboardPage } from './ui/pages/WhiteboardPage';
import { NotFoundPage } from './ui/pages/NotFoundPage';
import { EmojiLock } from './ui/components/auth/EmojiLock';
import { useAuth } from './logic/context/AuthContext';

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
