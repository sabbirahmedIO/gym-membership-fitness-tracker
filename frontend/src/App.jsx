import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MembershipPlans from './pages/MembershipPlans';
import BMICalculator from './pages/BMICalculator';
import WorkoutTracker from './pages/WorkoutTracker';
import WorkoutHistory from './pages/WorkoutHistory';
import AdminDashboard from './pages/AdminDashboard';
import MemberManagement from './pages/MemberManagement';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/membership" element={<MembershipPlans />} />
          <Route path="/dashboard/bmi" element={<BMICalculator />} />
          <Route path="/dashboard/workouts" element={<WorkoutTracker />} />
          <Route path="/dashboard/history" element={<WorkoutHistory />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<MemberManagement />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
