function TeamDashboard({
  team,
  savedTeams,
  handleTeamChange,
  saveTeam,
  deleteTeam,
}) {
  return (
    <section className="page-card">
      <h1>Team Dashboard</h1>
      <p>Create and manage your football teams.</p>

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
            {savedTeams.map((savedTeam) => (
              <div key={savedTeam.id} className="saved-player-card">
                <h3>{savedTeam.teamName || "Unnamed Team"}</h3>
                <p>{savedTeam.organization || "Organization"}</p>
                <p>{savedTeam.ageGroup || "Age Group"}</p>

                <button
                  className="delete-player-btn"
                  onClick={() => deleteTeam(savedTeam.id)}
                >
                  Delete Team
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamDashboard;