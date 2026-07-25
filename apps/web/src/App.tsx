import * as React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RouteLayout } from './components/RouteLayout.js';
import { ProtectedRoute } from './components/ProtectedRoute.js';
import { Spinner } from '@aegis/ui';

// Lazy load page views
const Landing = React.lazy(() => import('./pages/Landing.js'));
const Dashboard = React.lazy(() => import('./pages/Dashboard.js'));
const IntelligenceReport = React.lazy(() => import('./pages/IntelligenceReport.js'));
const Simulation = React.lazy(() => import('./pages/Simulation.js'));
const Execution = React.lazy(() => import('./pages/Execution.js'));
const History = React.lazy(() => import('./pages/History.js'));
const Settings = React.lazy(() => import('./pages/Settings.js'));
const NotFound = React.lazy(() => import('./pages/NotFound.js'));

// Loader Suspense boundary
function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense
      fallback={
        <div className="w-full min-h-[300px] flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={
            <PageSuspense>
              <Landing />
            </PageSuspense>
          }
        />

        {/* Core Layout containing Sidebar & Header */}
        <Route path="/app" element={<RouteLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />

          {/* Protected Routes Tree */}
          <Route element={<ProtectedRoute redirectPath="/" />}>
            <Route
              path="dashboard"
              element={
                <PageSuspense>
                  <Dashboard />
                </PageSuspense>
              }
            />
            <Route
              path="intelligence"
              element={
                <PageSuspense>
                  <IntelligenceReport />
                </PageSuspense>
              }
            />
            <Route
              path="simulation"
              element={
                <PageSuspense>
                  <Simulation />
                </PageSuspense>
              }
            />
            <Route
              path="execution"
              element={
                <PageSuspense>
                  <Execution />
                </PageSuspense>
              }
            />
            <Route
              path="history"
              element={
                <PageSuspense>
                  <History />
                </PageSuspense>
              }
            />
            <Route
              path="settings"
              element={
                <PageSuspense>
                  <Settings />
                </PageSuspense>
              }
            />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <PageSuspense>
              <NotFound />
            </PageSuspense>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
