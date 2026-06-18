import NextUpLogo from "../assets/NextUp-logo.png";

function LandingPage({ goToPage }) {
  return (
    <header className="landing-hero">
      <img
        src={NextUpLogo}
        alt="NextUp Football"
        className="landing-logo"
      />

      <p className="eyebrow">Youth Football Development Platform</p>

      <h1>Get in the Game</h1>

      <p className="hero-copy">
        Create player cards, track progress, and give coaches and parents one
        place to celebrate every athlete’s growth.
      </p>

      <div className="hero-actions">
        <button className="signup-btn" onClick={() => goToPage("signup")}>
          Create Account
        </button>

        <button className="login-btn" onClick={() => goToPage("login")}>
          Login
        </button>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>Player Cards</h3>
          <p>Digital rookie-style cards with photos, stats, and strengths.</p>
        </div>

        <div className="feature-card">
          <h3>Team Rosters</h3>
          <p>Coach-managed rosters built around player development.</p>
        </div>

        <div className="feature-card">
          <h3>Parent Access</h3>
          <p>Parents can follow progress and view their athlete’s card.</p>
        </div>
      </div>
    </header>
  );
}

export default LandingPage;