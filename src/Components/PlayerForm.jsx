function PlayerForm({
  player,
  handleChange,
  handlePhotoUpload,
  accountType,
  savePlayerCard,
  updatePlayerCard,
  startNewCard,
  selectedPlayerId,
}) {
  return (
    <section className="form-card">
      <h2>{selectedPlayerId ? "Edit Player Card" : "Create Player Card"}</h2>

      <input name="name" placeholder="Player Name" value={player.name} onChange={handleChange} />
      <input name="position" placeholder="Position" value={player.position} onChange={handleChange} />
      <input name="team" placeholder="Team Name" value={player.team} onChange={handleChange} />
      <input name="age" placeholder="Age" value={player.age} onChange={handleChange} />
      <input name="height" placeholder="Height" value={player.height} onChange={handleChange} />
      <input name="weight" placeholder="Weight" value={player.weight} onChange={handleChange} />
      <input name="forty" placeholder="40 Yard Dash" value={player.forty} onChange={handleChange} />
      <input name="tackles" placeholder="Tackles" value={player.tackles} onChange={handleChange} />

      <input type="file" accept="image/*" onChange={handlePhotoUpload} />

      <input name="strengthOne" placeholder="Strength One" value={player.strengthOne} onChange={handleChange} />
      <input name="strengthOneDescription" placeholder="Strength One Description" value={player.strengthOneDescription} onChange={handleChange} />
      <input name="strengthTwo" placeholder="Strength Two" value={player.strengthTwo} onChange={handleChange} />
      <input name="strengthTwoDescription" placeholder="Strength Two Description" value={player.strengthTwoDescription} onChange={handleChange} />

      <textarea
        name="coachNote"
        placeholder={
          accountType === "coach"
            ? "Coach Note"
            : "Parent Note / Player Description"
        }
        value={player.coachNote}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button className="signup-btn" onClick={savePlayerCard}>
          Save New Player Card
        </button>

        <button className="login-btn" onClick={updatePlayerCard}>
          Update Loaded Card
        </button>

        <button className="login-btn" onClick={startNewCard}>
          Start New Card
        </button>
      </div>
    </section>
  );
}

export default PlayerForm;