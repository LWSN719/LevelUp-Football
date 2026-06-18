import PlayerForm from "./PlayerForm";
import PlayerCard from "./PlayerCard";
import SavedPlayers from "./SavedPlayers";

function ParentHQ({
    player,
    handleChange,
    handlePhotoUpload,
    accountType,
    savePlayerCard,
    updatePlayerCard,
    startNewCard,
    selectedPlayerId,
    savedPlayers,
    savedTeams,
    loadPlayerIntoForm,
    deletePlayerCard,
    requestToJoinTeam,
}) {
    return (
        <>
            <section className="dashboard-header">
                <p className="eyebrow">Parent Dashboard</p>

                <h1>{selectedPlayerId ? "Update Player Card" : "Create Player Card"}</h1>

                <p>
                    {selectedPlayerId
                        ? "You are editing a saved player card."
                        : "Build a digital player card with photos, stats, and team info."}
                </p>
            </section>

            <main className="card-builder">
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

                <section className="preview-section">
                    <h2>Live Card Preview</h2>
                    <PlayerCard player={player} />
                </section>
            </main>

            <SavedPlayers
                savedPlayers={savedPlayers}
                savedTeams={savedTeams}
                loadPlayerIntoForm={loadPlayerIntoForm}
                deletePlayerCard={deletePlayerCard}
                requestToJoinTeam={requestToJoinTeam}
            />
        </>
    );
}

export default ParentHQ;