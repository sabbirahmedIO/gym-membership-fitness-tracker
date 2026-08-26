import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="auth-screen">
    <div className="auth-card" style={{ textAlign: 'center' }}>
      <span className="auth-card__logo">PULSE</span>
      <h1>404</h1>
      <p className="auth-card__subtitle">This page doesn't exist — even our treadmills don't run that far.</p>
      <Link to="/" className="btn btn--primary">Back to Home</Link>
    </div>
  </div>
);

export default NotFound;
