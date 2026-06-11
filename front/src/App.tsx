import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-zinc-100">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            
            <Routes>
              <Route path="/dashboard" element={<Dashboard/>} />

              {/* Cualquier otra ruta redirige al dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>

          </div>
        </main>

      </div>
    </Router>
  );
}