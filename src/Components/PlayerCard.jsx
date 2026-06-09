function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <div className="card-inner">
        <div className="card-header-row">
          <h2>{player.name || "Player Name"}</h2>
          <span className="position-pill">{player.position || "POS"}</span>
        </div>

        <p className="card-brand">LEVELUP FOOTBALL</p>

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

        <div className="card-ability">
          <div className="ability-title">
            <span>⚡</span>
            <strong>{player.strengthOne || "Strength One"}</strong>
          </div>
          <p>
            {player.strengthOneDescription ||
              "Strength description goes here."}
          </p>
        </div>

        <div className="card-ability">
          <div className="ability-title">
            <span>🧱</span>
            <strong>{player.strengthTwo || "Strength Two"}</strong>
          </div>
          <p>
            {player.strengthTwoDescription ||
              "Strength description goes here."}
          </p>
        </div>

        <div className="coach-note">
          <strong>Coach Note</strong>
          <p>{player.coachNote || "Coach note will appear here."}</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;