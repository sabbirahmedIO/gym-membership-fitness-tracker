import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const features = [
  { title: 'Workout Tracker', desc: 'Log every set, rep and rest day in a training log built for daily use.', icon: '⌁' },
  { title: 'BMI Calculator', desc: 'Instant Body Mass Index readouts on the same gauge used across your dashboard.', icon: '◑' },
  { title: 'Membership Plans', desc: 'Compare and subscribe to gym plans without a front-desk queue.', icon: '◆' },
  { title: 'Progress Charts', desc: 'A 7-day activity trend line and streak counter keep momentum visible.', icon: '▲' },
  { title: 'Admin Control Room', desc: 'Manage members, plans and system-wide stats from one dashboard.', icon: '☰' },
  { title: 'Secure by Default', desc: 'JWT authentication and bcrypt password hashing on every request.', icon: '⛨' },
];

const Landing = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="landing">
      <header className="landing__nav">
        <span className="landing__logo">PULSE</span>
        <div className="landing__nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <Link to="/login" className="btn btn--ghost">Log In</Link>
          <Link to="/register" className="btn btn--primary">Get Started</Link>
        </div>
      </header>

      <section className="landing__hero">
        <div className="landing__hero-copy">
          <span className="eyebrow">Gym Membership &amp; Fitness Tracker</span>
          <h1>
            Train with data.
            <br />
            Not with guesswork.
          </h1>
          <p>
            PULSE turns spreadsheet-and-paper gym records into one live dashboard — memberships,
            workouts, BMI and admin oversight, tracked the moment they happen.
          </p>
          <div className="landing__hero-actions">
            <Link to="/register" className="btn btn--primary btn--lg">Start Training</Link>
            <Link to="/login" className="btn btn--outline btn--lg">I already have an account</Link>
          </div>
        </div>
        <div className="landing__hero-visual" aria-hidden="true">
          <div className="hero-gauge">
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="86" className="hero-gauge__track" />
              <circle cx="100" cy="100" r="86" className="hero-gauge__arc" />
            </svg>
            <div className="hero-gauge__readout">
              <span className="hero-gauge__num">86%</span>
              <span className="hero-gauge__label">Weekly Goal</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing__features">
        <h2>Everything one membership needs</h2>
        <div className="feature-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-card__icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="landing__footer">
        <span>PULSE — Gym Membership &amp; Fitness Tracker System</span>
        <span>Built with the MERN stack</span>
      </footer>
    </div>
  );
};

export default Landing;
