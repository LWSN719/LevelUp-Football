import { useState } from "react";

function TeamDashboard({
  team,
  savedTeams,
  savedPlayers,
  teamAssignments,
  handleTeamChange,
  saveTeam,
  deleteTeam,
  assignPlayerToTeam,
  removePlayerFromTeam,
}) {
  const [selectedPlayers, setSelectedPlayers] = useState({});

  const handleSelectPlayer = (teamId, playerId) => {
    setSelectedPlayers({
      ...selectedPlayers,
      [teamId]: playerId,
    });
  };

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
      <p>Create teams and assign players to rosters.</p>

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

                  <div className="team-assign-box">
                    <select
                      value={selectedPlayers[savedTeam.id] || ""}
                      onChange={(event) =>
                        handleSelectPlayer(savedTeam.id, event.target.value)
                      }
                    >
                      <option value="">Select player</option>

                      {savedPlayers.map((savedPlayer) => (
                        <option key={savedPlayer.id} value={savedPlayer.id}>
                          {savedPlayer.name || "Unnamed Player"} -{" "}
                          {savedPlayer.position || "Position"}
                        </option>
                      ))}
                    </select>

                    <button
                      className="signup-btn"
                      onClick={() =>
                        assignPlayerToTeam(
                          savedTeam.id,
                          selectedPlayers[savedTeam.id]
                        )
                      }
                    >
                      Add Player
                    </button>
                  </div>

                  <div className="assigned-roster">
                    <h4>Roster</h4>

                    {assignedPlayers.length === 0 ? (
                      <p>No players assigned yet.</p>
                    ) : (
                      assignedPlayers.map((player) => (
                        <div key={player.assignmentId} className="roster-row">
                          <span>
                            {player.name || "Unnamed Player"} —{" "}
                            {player.position || "Position"}
                          </span>

                          <button
                            className="delete-player-btn"
                            onClick={() =>
                              removePlayerFromTeam(player.assignmentId)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      ))
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