function SavedPlayers({
  savedPlayers,
  savedTeams,
  loadPlayerIntoForm,
  deletePlayerCard,
  requestToJoinTeam,
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

              <div className="team-assign-box">
                <select
                  defaultValue=""
                  onChange={(event) => {
                    const selectedTeam = savedTeams.find(
                      (team) => team.id === event.target.value
                    );

                    if (selectedTeam) {
                      requestToJoinTeam(
                        selectedTeam.id,
                        selectedTeam.teamName,
                        savedPlayer.id,
                        savedPlayer.name
                      );
                    }
                  }}
                >
                  <option value="">Request to Join Team</option>

                  {savedTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.organization || "Organization"} -{" "}
                      {team.teamName || "Team"} ({team.ageGroup || "Age Group"})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedPlayers;