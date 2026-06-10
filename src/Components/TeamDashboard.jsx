import PlayerCard from "./PlayerCard";

function TeamDashboard({
  team,
  savedTeams,
  savedPlayers,
  teamAssignments,
  handleTeamChange,
  saveTeam,
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
      <h1>Team Dashboard</h1>
      <p>Create teams, review join requests, and manage your roster.</p>

      <div className="team-placeholder">
        <h2>Create Team</h2>

        <input
          name="teamName"
          placeholder="Team Name"
          value={team.teamName}
          onChange={handleTeamChange}
        />

        <input
          name="organization"
          placeholder="Organization"
          value={team.organization}
          onChange={handleTeamChange}
        />

        <input
          name="ageGroup"
          placeholder="Age Group"
          value={team.ageGroup}
          onChange={handleTeamChange}
        />

        <button className="signup-btn" onClick={saveTeam}>
          Save Team
        </button>
      </div>

      <div className="saved-players-section">
        <h2>My Teams</h2>

        {savedTeams.length === 0 ? (
          <p>No teams created yet.</p>
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
                    Delete Team
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