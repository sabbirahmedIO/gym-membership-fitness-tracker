import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => (
  <div className="app-shell">
    <Sidebar />
    <main className="app-shell__content">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
