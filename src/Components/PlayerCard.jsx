function PlayerCard({ player, wentWell = [], needsWork = [], coachNote = "" }) {
  return (
    <div className="player-card">
      <div className="card-inner">
        <div className="card-header-row">
          <h2>{player.name || "Player Name"}</h2>
          <span className="position-pill">{player.position || "POS"}</span>
        </div>

        <p className="card-brand">NEXTUP FOOTBALL</p>

        <div className="card-photo-frame">
          {player.photo ? (
            <img src={player.photo} alt={player.name || "Player"} />
          ) : (
            <span>Upload Player Photo</span>
          )}
        </div>

        <div className="team-strip">{player.team || "Team Name"}</div>

        <div className="card-stats">
          <div>
            <span>AGE</span>
            <strong>{player.age || "--"}</strong>
          </div>
          <div>
            <span>40</span>
            <strong>{player.forty || "--"}</strong>
          </div>
          <div>
            <span>HT</span>
            <strong>{player.height || "--"}</strong>
          </div>
          <div>
            <span>WT</span>
            <strong>{player.weight || "--"}</strong>
          </div>
        </div>

        <div className="card-feedback">
          <strong>Went Well</strong>
          {wentWell.length > 0 ? (
            <div className="mini-tag-list">
              {wentWell.map((item) => (
                <span key={item} className="mini-tag positive">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p>No strengths selected yet.</p>
          )}
        </div>

        <div className="card-feedback">
          <strong>Needs to Work On</strong>
          {needsWork.length > 0 ? (
            <div className="mini-tag-list">
              {needsWork.map((item) => (
                <span key={item} className="mini-tag focus">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p>No focus areas selected yet.</p>
          )}
        </div>

        <div className="coach-note">
          <strong>Coach Note</strong>
          <p>{coachNote || player.coachNote || "Coach note will appear here."}</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;