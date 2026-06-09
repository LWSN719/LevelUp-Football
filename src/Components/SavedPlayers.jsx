function SavedPlayers({
  savedPlayers,
  loadPlayerIntoForm,
  deletePlayerCard,
}) {
  return (
    <section className="saved-players-section">
      <h2>My Saved Players</h2>

      {savedPlayers.length === 0 ? (
        <p>No saved players yet.</p>
      ) : (
        <div className="saved-player-grid">
          {savedPlayers.map((savedPlayer) => (
            <div key={savedPlayer.id} className="saved-player-card">
              <h3>{savedPlayer.name || "Unnamed Player"}</h3>

              <p>
                {savedPlayer.position || "Position"} ·{" "}
                {savedPlayer.team || "Team"}
              </p>

              <div className="saved-player-actions">
                <button onClick={() => loadPlayerIntoForm(savedPlayer)}>
                  Load Card
                </button>

                <button
                  className="delete-player-btn"
                  onClick={() => deletePlayerCard(savedPlayer.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedPlayers;
