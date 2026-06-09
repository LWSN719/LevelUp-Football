import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, googleProvider, db } from "./firebase";
import PlayerCard from "./components/PlayerCard";
import levelUpLogo from "./assets/levelup-logo.png";
import Navbar from "./components/Navbar";
import SavedPlayers from "./components/SavedPlayers";
import PlayerForm from "./components/PlayerForm";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [user, setUser] = useState(null);
  const [savedPlayers, setSavedPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const emptyPlayer = {
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
  };

  const [player, setPlayer] = useState(emptyPlayer);

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

  const loadSavedPlayers = async (currentUser) => {
    if (!currentUser) return;

    try {
      const playersQuery = query(
        collection(db, "players"),
        where("ownerId", "==", currentUser.uid)
      );

      const snapshot = await getDocs(playersQuery);

      const players = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setSavedPlayers(players);
    } catch (error) {
      console.error("Error loading saved players:", error);
      alert("Something went wrong loading saved players.");
    }
  };

  const loginWithGoogle = async (type) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      setUser(result.user);
      setIsLoggedIn(true);
      setAccountType(type);

      await loadSavedPlayers(result.user);

      if (type === "coach") {
        goToPage("teams");
      } else {
        goToPage("cards");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Check the console for details.");
    }
  };

  const logout = async () => {
    await signOut(auth);

    setUser(null);
    setIsLoggedIn(false);
    setAccountType("");
    setSavedPlayers([]);
    setSelectedPlayerId(null);
    setPlayer(emptyPlayer);
    goToPage("home");
  };

  const savePlayerCard = async () => {
    if (!user) {
      alert("You must be logged in to save a player card.");
      return;
    }

    try {
      await addDoc(collection(db, "players"), {
        ...player,
        ownerId: user.uid,
        ownerEmail: user.email,
        accountType,
        createdAt: serverTimestamp(),
      });

      alert("Player card saved!");
      setPlayer(emptyPlayer);
      setSelectedPlayerId(null);
      await loadSavedPlayers(user);
    } catch (error) {
      console.error("Error saving player card:", error);
      alert("Something went wrong saving the card.");
    }
  };

  const updatePlayerCard = async () => {
    if (!selectedPlayerId) {
      alert("Load a saved player first before updating.");
      return;
    }

    try {
      await updateDoc(doc(db, "players", selectedPlayerId), {
        ...player,
        updatedAt: serverTimestamp(),
      });

      alert("Player card updated!");
      await loadSavedPlayers(user);
    } catch (error) {
      console.error("Error updating player card:", error);
      alert("Something went wrong updating the card.");
    }
  };

  const deletePlayerCard = async (playerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this player card?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "players", playerId));

      if (selectedPlayerId === playerId) {
        setSelectedPlayerId(null);
        setPlayer(emptyPlayer);
      }

      await loadSavedPlayers(user);
      alert("Player card deleted.");
    } catch (error) {
      console.error("Error deleting player card:", error);
      alert("Something went wrong deleting the card.");
    }
  };

  const loadPlayerIntoForm = (savedPlayer) => {
    setPlayer({
      name: savedPlayer.name || "",
      position: savedPlayer.position || "",
      team: savedPlayer.team || "",
      age: savedPlayer.age || "",
      height: savedPlayer.height || "",
      weight: savedPlayer.weight || "",
      forty: savedPlayer.forty || "",
      tackles: savedPlayer.tackles || "",
      photo: savedPlayer.photo || "",
      strengthOne: savedPlayer.strengthOne || "",
      strengthOneDescription: savedPlayer.strengthOneDescription || "",
      strengthTwo: savedPlayer.strengthTwo || "",
      strengthTwoDescription: savedPlayer.strengthTwoDescription || "",
      coachNote: savedPlayer.coachNote || "",
    });

    setSelectedPlayerId(savedPlayer.id);
  };

  const startNewCard = () => {
    setPlayer(emptyPlayer);
    setSelectedPlayerId(null);
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
          <p>Sign in with Google and choose your account type.</p>

          <div className="hero-actions">
            <button
              className="login-btn"
              onClick={() => loginWithGoogle("coach")}
            >
              Login as Coach
            </button>

            <button
              className="signup-btn"
              onClick={() => loginWithGoogle("parent")}
            >
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
            <button
              className="signup-btn"
              onClick={() => loginWithGoogle("parent")}
            >
              Parent Account
            </button>

            <button
              className="login-btn"
              onClick={() => loginWithGoogle("coach")}
            >
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

            <h1>{selectedPlayerId ? "Update Player Card" : "Create Player Card"}</h1>

            <p>
              {selectedPlayerId
                ? "You are editing a saved player card."
                : "Build a digital player card with photos, stats, strengths, and notes."}
            </p>
          </section>

          <main className="card-builder">
         

            <section className="preview-section">
              <h2>Player Card Preview</h2>
              <PlayerCard player={player} />
            </section>
          </main>
          <PlayerForm
          player={player}
          handleChange={handleChange}
          handlePhotoUpload={handlePhotoUpload}
          accountType={accountType}
          savePlayerCard={savePlayerCard}
          updatePlayerCard={updatePlayerCard}
          startNewCard={startNewCard}
          selectedPlayerId={selectedPlayerId}
        />

                  <SavedPlayers
          savedPlayers={savedPlayers}
          loadPlayerIntoForm={loadPlayerIntoForm}
          deletePlayerCard={deletePlayerCard}
/>
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
      
    <Navbar
  isLoggedIn={isLoggedIn}
  accountType={accountType}
  user={user}
  goToPage={goToPage}
  logout={logout}
/>

      {renderPage()}
    </div>
  );
}

export default App;