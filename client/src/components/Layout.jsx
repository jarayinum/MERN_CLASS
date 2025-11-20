import { Outlet } from 'react-router-dom';

import { NavBar } from './NavBar';

export const Layout = () => {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

