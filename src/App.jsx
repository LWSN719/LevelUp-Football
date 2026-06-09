import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import levelUpLogo from "./assets/levelup-logo.png";
import "./App.css";

function App() {
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPlayer({
      ...player,
      [name]: value,
    });
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPlayer({
        ...player,
        photo: URL.createObjectURL(file),
      });
    }
  };

  const loginAsParent = () => {
    setIsLoggedIn(true);
    setAccountType("parent");
  };

  const loginAsCoach = () => {
    setIsLoggedIn(true);
    setAccountType("coach");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccountType("");
  };

  return (
    <div className="app">
      <nav className="top-nav">
        <div className="nav-brand">LevelUp Football</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#cards-info">Player Cards</a>
          <a href="#teams-info">Teams</a>

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
              <button className="login-btn" onClick={loginAsCoach}>
                Coach Login
              </button>
              <button className="signup-btn" onClick={loginAsParent}>
                Parent Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {!isLoggedIn ? (
        <>
          <header id="home" className="hero landing-hero">
            <img
              src={levelUpLogo}
              alt="LevelUp Football"
              style={{
                width: "320px",
                maxWidth: "320px",
                height: "auto",
                display: "block",
                margin: "0 auto 1.5rem",
              }}
            />

            <p className="eyebrow">Youth Football Development Platform</p>

            <h1>Get in the Game.</h1>

            <p className="hero-copy">
              Create player cards, track progress, and give coaches and parents
              one place to celebrate every athlete’s growth.
            </p>

            <div className="hero-actions">
              <button className="signup-btn" onClick={loginAsParent}>
                Sign Up as Parent
              </button>

              <button className="login-btn" onClick={loginAsCoach}>
                Login as Coach
              </button>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <h3>Player Cards</h3>
                <p>
                  Create custom digital cards with photos, stats, strengths,
                  and notes.
                </p>
              </div>

              <div className="feature-card">
                <h3>Team Rosters</h3>
                <p>
                  Coaches can manage athletes and track development across the
                  team.
                </p>
              </div>

              <div className="feature-card">
                <h3>Parent Access</h3>
                <p>
                  Parents can view progress, cards, and coach feedback in one
                  place.
                </p>
              </div>
            </div>
          </header>

          <section id="cards-info" className="info-section">
            <h2>Player Cards</h2>
            <p>
              Parents and coaches can create digital rookie-style cards with
              player photos, stats, strengths, team info, and coach notes.
            </p>
          </section>

          <section id="teams-info" className="info-section">
            <h2>Teams</h2>
            <p>
              Coaches will be able to create team pages, manage rosters, update
              player strengths, and add development notes.
            </p>
          </section>
        </>
      ) : (
        <>
          <section className="dashboard-header">
            <p className="eyebrow">
              {accountType === "coach" ? "Coach Dashboard" : "Parent Dashboard"}
            </p>

            <h1>
              {accountType === "coach"
                ? "Manage Your Team"
                : "Create Your Player Card"}
            </h1>

            <p>
              {accountType === "coach"
                ? "Update player strengths, add coach notes, and manage roster progress."
                : "Build a digital player card that celebrates your athlete’s growth."}
            </p>
          </section>

          <main id="cards" className="card-builder">
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

          <section id="teams" className="teams-preview">
            <h2>Team Tools Coming Soon</h2>
            <p>
              Coaches will be able to create teams, manage rosters, update
              player strengths, and add coach notes.
            </p>
          </section>
        </>
      )}
    </div>
  );
}

export default App;