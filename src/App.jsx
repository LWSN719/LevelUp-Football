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
import Navbar from "./components/Navbar";
import PlayerForm from "./components/PlayerForm";
import PlayerCard from "./components/PlayerCard";
import SavedPlayers from "./components/SavedPlayers";
import TeamDashboard from "./components/TeamDashboard";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [user, setUser] = useState(null);

  const [savedPlayers, setSavedPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const [team, setTeam] = useState({
    teamName: "",
    organization: "",
    ageGroup: "",
  });

  const [savedTeams, setSavedTeams] = useState([]);

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

  const handleTeamChange = (event) => {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value });
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

  const loadSavedTeams = async (currentUser) => {
    if (!currentUser) return;

    try {
      const teamsQuery = query(
        collection(db, "teams"),
        where("coachId", "==", currentUser.uid)
      );

      const snapshot = await getDocs(teamsQuery);

      const teams = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setSavedTeams(teams);
    } catch (error) {
      console.error("Error loading teams:", error);
      alert("Something went wrong loading teams.");
    }
  };

  const loginWithGoogle = async (type) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      setUser(result.user);
      setIsLoggedIn(true);
      setAccountType(type);

      await loadSavedPlayers(result.user);
      await loadSavedTeams(result.user);

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
    setSavedTeams([]);
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

  const saveTeam = async () => {
    if (!user) {
      alert("You must be logged in to create a team.");
      return;
    }

    try {
      await addDoc(collection(db, "teams"), {
        ...team,
        coachId: user.uid,
        coachEmail: user.email,
        createdAt: serverTimestamp(),
      });

      alert("Team created!");

      setTeam({
        teamName: "",
        organization: "",
        ageGroup: "",
      });

      await loadSavedTeams(user);
    } catch (error) {
      console.error("Error saving team:", error);
      alert("Something went wrong creating the team.");
    }
  };

  const deleteTeam = async (teamId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "teams", teamId));
      await loadSavedTeams(user);
      alert("Team deleted.");
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("Something went wrong deleting the team.");
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
  return <LandingPage goToPage={goToPage} />;
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
    <AuthPage
      title="Login"
      description="Sign in with Google and choose your account type."
      loginWithGoogle={loginWithGoogle}
    />
  );
}

   if (page === "signup") {
  return (
    <AuthPage
      title="Create Account"
      description="Choose how you want to use LevelUp Football."
      loginWithGoogle={loginWithGoogle}
    />
  );
}

    if (isLoggedIn && page === "teams") {
      return (
        <TeamDashboard
          team={team}
          savedTeams={savedTeams}
          handleTeamChange={handleTeamChange}
          saveTeam={saveTeam}
          deleteTeam={deleteTeam}
        />
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