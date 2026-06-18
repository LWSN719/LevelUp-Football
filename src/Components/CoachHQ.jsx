import { useState } from "react";
import PendingRequests from "./PendingRequests";
import CoachRoster from "./CoachRoster";
import FeedbackPanel from "./FeedbackPanel";
import PlayerCard from "./PlayerCard";

function CoachHQ({ user, loadTeamAssignments, teamAssignments = [] }) {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [reviewedPlayers, setReviewedPlayers] = useState([]);

    const [wentWell, setWentWell] = useState([]);
    const [needsWork, setNeedsWork] = useState([]);
    const [coachNote, setCoachNote] = useState("");

    const handleSelectPlayer = (player) => {
        setSelectedPlayer(player);
        setWentWell([]);
        setNeedsWork([]);
        setCoachNote("");
        window.scrollTo(0, 0);
    };

    const handleSaveFeedback = () => {
        setReviewedPlayers((prev) => [...prev, selectedPlayer.id]);
        setSelectedPlayer(null);
        setWentWell([]);
        setNeedsWork([]);
        setCoachNote("");
        window.scrollTo(0, 0);
    };

    if (selectedPlayer) {
        const cardPlayer = {
            name: selectedPlayer.playerName,
            team: selectedPlayer.teamName,
            position: selectedPlayer.position || "POS",
            age: selectedPlayer.age || "",
            height: selectedPlayer.height || "",
            weight: selectedPlayer.weight || "",
            forty: selectedPlayer.forty || "",
            photo: selectedPlayer.photo || "",
        };

        return (
            <>
                <section className="dashboard-header">
                    <p className="eyebrow">Coach Feedback</p>
                    <h1>{selectedPlayer.playerName}</h1>
                    <p>{selectedPlayer.teamName}</p>

                    <button className="login-btn" onClick={() => setSelectedPlayer(null)}>
                        Back to Roster
                    </button>
                </section>

                <main className="card-builder">
                    <section className="preview-section">
                        <h2>Player Card</h2>
                        <PlayerCard
                            player={cardPlayer}
                            wentWell={wentWell}
                            needsWork={needsWork}
                            coachNote={coachNote}
                        />
                    </section>

                    <section className="preview-section">
                        <h2>Leave Feedback</h2>
                        <FeedbackPanel
                            wentWell={wentWell}
                            setWentWell={setWentWell}
                            needsWork={needsWork}
                            setNeedsWork={setNeedsWork}
                            coachNote={coachNote}
                            setCoachNote={setCoachNote}
                        />

                        <button className="save-feedback-btn" onClick={handleSaveFeedback}>
                            Save Feedback
                        </button>
                    </section>
                </main>
            </>
        );
    }

    return (
        <>
            <section className="dashboard-header">
                <p className="eyebrow">Coach Dashboard</p>
                <h1>Coach HQ</h1>
                <p>Manage rosters, approve players, and provide feedback.</p>
            </section>

            <PendingRequests user={user} loadTeamAssignments={loadTeamAssignments} />

            <CoachRoster
                teamAssignments={teamAssignments}
                onSelectPlayer={handleSelectPlayer}
                reviewedPlayers={reviewedPlayers}
            />
        </>
    );
}

export default CoachHQ;