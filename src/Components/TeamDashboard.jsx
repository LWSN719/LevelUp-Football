import PlayerCard from "./PlayerCard";

function TeamDashboard({
  savedTeams,
  savedPlayers,
  teamAssignments,
  deleteTeam,
  removePlayerFromTeam,
}) {
  const getAssignedPlayers = (teamId) => {
    const assignments = teamAssignments.filter(
      (assignment) => assignment.teamId === teamId
    );

    return assignments
      .map((assignment) => {
        const player = savedPlayers.find(
          (savedPlayer) => savedPlayer.id === assignment.playerId
        );

        return {
          assignmentId: assignment.id,
          ...player,
        };
      })
      .filter(Boolean);
  };

  return (
    <section className="page-card">
      <h1>My Teams</h1>
      <p>View your assigned teams, roster cards, and pending player requests.</p>

      <div className="saved-players-section">
        {savedTeams.length === 0 ? (
          <p>No teams assigned yet.</p>
        ) : (
          <div className="saved-player-grid">
            {savedTeams.map((savedTeam) => {
              const assignedPlayers = getAssignedPlayers(savedTeam.id);

              return (
                <div key={savedTeam.id} className="saved-player-card">
                  <h3>{savedTeam.teamName || "Unnamed Team"}</h3>
                  <p>{savedTeam.organization || "Organization"}</p>
                  <p>{savedTeam.ageGroup || "Age Group"}</p>

                  <div className="assigned-roster">
                    <h4>Roster Cards</h4>

                    {assignedPlayers.length === 0 ? (
                      <p>No approved players yet.</p>
                    ) : (
                      <div className="team-card-hand">
                        {assignedPlayers.map((player) => (
                          <div
                            key={player.assignmentId}
                            className="team-card-slot"
                          >
                            <PlayerCard player={player} />

                            <button
                              className="delete-player-btn"
                              onClick={() =>
                                removePlayerFromTeam(player.assignmentId)
                              }
                            >
                              Remove From Team
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    className="delete-player-btn"
                    onClick={() => deleteTeam(savedTeam.id)}
                  >
                    Remove Team
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamDashboard;