function CoachRoster({
    teamAssignments = [],
    onSelectPlayer,
    reviewedPlayers = []
}) {
    return (
        <section className="feedback-panel">
            <h2>Team Roster</h2>

            {teamAssignments.length === 0 ? (
                <p className="muted">No approved players yet.</p>
            ) : (
                <div className="request-list">
                    {teamAssignments.map((player) => (
                        <div key={player.id} className="request-card">
                            <div>
                                <h3>{player.playerName}</h3>
                                <p>{player.teamName}</p>
                            </div>

                            {reviewedPlayers.includes(player.id) ? (
                                <span className="reviewed-badge">Reviewed Today</span>
                            ) : (
                                <button className="approve-btn" onClick={() => onSelectPlayer(player)}>
                                    Leave Feedback
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default CoachRoster;