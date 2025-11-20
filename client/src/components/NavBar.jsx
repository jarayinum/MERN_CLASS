import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="nav-bar">
      <Link to="/" className="logo">
        MERN Academy
      </Link>
      <nav>
        <Link to="/concepts">Concepts</Link>
        {user && <Link to="/profile">Profile</Link>}
      </nav>
      <div>
        {user ? (
          <button type="button" onClick={logout} className="btn ghost">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn ghost">
              Login
            </Link>
            <Link to="/register" className="btn primary">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

