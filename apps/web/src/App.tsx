import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout.js';
import Landing from './pages/Landing.js';
import Dashboard from './pages/Dashboard.js';
import Intelligence from './pages/Intelligence.js';
import Simulation from './pages/Simulation.js';
import Execution from './pages/Execution.js';
import History from './pages/History.js';
import Settings from './pages/Settings.js';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="intelligence" element={<Intelligence />} />
          <Route path="simulation" element={<Simulation />} />
          <Route path="execution" element={<Execution />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
