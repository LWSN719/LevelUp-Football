import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import levelUpLogo from "./assets/levelup-logo.png";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState("");

  const [player, setPlayer] = useState({
    name: "",
    position: "",
    team: "",
    age: "",
    height: "",
    weight: "",
    forty: "",
    tackles: "",
    photo: "",
    strengthOne: "",
    strengthOneDescription: "",
    strengthTwo: "",
    strengthTwoDescription: "",
    coachNote: "",
  });

  const goToPage = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlayer({ ...player, [name]: value });
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPlayer({ ...player, photo: URL.createObjectURL(file) });
    }
  };

  const loginAsParent = () => {
    setIsLoggedIn(true);
    setAccountType("parent");
    goToPage("cards");
  };

  const loginAsCoach = () => {
    setIsLoggedIn(true);
    setAccountType("coach");
    goToPage("teams");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccountType("");
    goToPage("home");
  };

  const renderPage = () => {
    if (page === "home") {
      return (
        <header className="landing-hero">
          <img
            src={levelUpLogo}
            alt="LevelUp Football"
            className="landing-logo"
          />

          <p className="eyebrow">Youth Football Development Platform</p>

          <h1>Get in the Game.</h1>

          <p className="hero-copy">
            Create player cards, track progress, and give coaches and parents
            one place to celebrate every athlete’s growth.
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

    if (page === "cards" && !isLoggedIn) {
      return (
        <section className="page-card">
          <h1>Player Cards</h1>
          <p>
            Create your own player cards or view your saved player cards by
            logging in.
          </p>
          <p>
            If you do not have an account, create one{" "}
            <button className="text-link" onClick={() => goToPage("signup")}>
              here
            </button>
            .
          </p>
        </section>
      );
    }

    if (page === "teams" && !isLoggedIn) {
      return (
        <section className="page-card">
          <h1>Teams</h1>
          <p>
            Team pages will allow coaches to manage rosters, view player cards,
            update strengths, and add coach notes.
          </p>
          <p>
            Coach tools are coming soon. Login or create an account to prepare
            your team profile.
          </p>
        </section>
      );
    }

    if (page === "login") {
      return (
        <section className="page-card">
          <h1>Login</h1>
          <p>Select an account type for now. Google login comes next.</p>

          <div className="hero-actions">
            <button className="login-btn" onClick={loginAsCoach}>
              Login as Coach
            </button>

            <button className="signup-btn" onClick={loginAsParent}>
              Login as Parent
            </button>
          </div>
        </section>
      );
    }

    if (page === "signup") {
      return (
        <section className="page-card">
          <h1>Create Account</h1>
          <p>Choose how you want to use LevelUp Football.</p>

          <div className="hero-actions">
            <button className="signup-btn" onClick={loginAsParent}>
              Parent Account
            </button>

            <button className="login-btn" onClick={loginAsCoach}>
              Coach Account
            </button>
          </div>
        </section>
      );
    }

    if (isLoggedIn && page === "cards") {
      return (
        <>
          <section className="dashboard-header">
            <p className="eyebrow">
              {accountType === "coach" ? "Coach Dashboard" : "Parent Dashboard"}
            </p>

            <h1>Create Your Player Card</h1>

            <p>
              Build a digital player card with photos, stats, strengths, and
              notes.
            </p>
          </section>

          <main className="card-builder">
            <section className="form-card">
              <h2>Create Player Card</h2>

              <input
                name="name"
                placeholder="Player Name"
                value={player.name}
                onChange={handleChange}
              />

              <input
                name="position"
                placeholder="Position"
                value={player.position}
                onChange={handleChange}
              />

              <input
                name="team"
                placeholder="Team Name"
                value={player.team}
                onChange={handleChange}
              />

              <input
                name="age"
                placeholder="Age"
                value={player.age}
                onChange={handleChange}
              />

              <input
                name="height"
                placeholder="Height"
                value={player.height}
                onChange={handleChange}
              />

              <input
                name="weight"
                placeholder="Weight"
                value={player.weight}
                onChange={handleChange}
              />

              <input
                name="forty"
                placeholder="40 Yard Dash"
                value={player.forty}
                onChange={handleChange}
              />

              <input
                name="tackles"
                placeholder="Tackles"
                value={player.tackles}
                onChange={handleChange}
              />

              <input type="file" accept="image/*" onChange={handlePhotoUpload} />

              <input
                name="strengthOne"
                placeholder="Strength One"
                value={player.strengthOne}
                onChange={handleChange}
              />

              <input
                name="strengthOneDescription"
                placeholder="Strength One Description"
                value={player.strengthOneDescription}
                onChange={handleChange}
              />

              <input
                name="strengthTwo"
                placeholder="Strength Two"
                value={player.strengthTwo}
                onChange={handleChange}
              />

              <input
                name="strengthTwoDescription"
                placeholder="Strength Two Description"
                value={player.strengthTwoDescription}
                onChange={handleChange}
              />

              <textarea
                name="coachNote"
                placeholder={
                  accountType === "coach"
                    ? "Coach Note"
                    : "Parent Note / Player Description"
                }
                value={player.coachNote}
                onChange={handleChange}
              />
            </section>

            <section className="preview-section">
              <h2>Player Card Preview</h2>
              <PlayerCard player={player} />
            </section>
          </main>
        </>
      );
    }

    if (isLoggedIn && page === "teams") {
      return (
        <section className="page-card">
          <h1>Team Dashboard</h1>
          <p>
            Coaches will create teams, manage rosters, and update player cards
            from here.
          </p>

          <div className="team-placeholder">
            <h2>GAS Elite Mavericks</h2>
            <p>Roster tools coming soon.</p>
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <div className="app">
      <nav className="top-nav">
        <div className="nav-brand" onClick={() => goToPage("home")}>
          LevelUp Football
        </div>

        <div className="nav-links">
          <button onClick={() => goToPage("home")}>Home</button>
          <button onClick={() => goToPage("cards")}>Player Cards</button>
          <button onClick={() => goToPage("teams")}>Teams</button>

          {isLoggedIn ? (
            <>
              <span className="account-pill">
                {accountType === "coach" ? "Coach Account" : "Parent Account"}
              </span>

              <button className="login-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={() => goToPage("login")}>
                Login
              </button>

              <button className="signup-btn" onClick={() => goToPage("signup")}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {renderPage()}
    </div>
  );
}

export default App;