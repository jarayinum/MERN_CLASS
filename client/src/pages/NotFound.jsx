import { Link } from 'react-router-dom';

export const NotFound = () => (
  <section className="card">
    <h1>404</h1>
    <p>The page you requested does not exist.</p>
    <Link to="/" className="btn primary">
      Go home
    </Link>
  </section>
);

