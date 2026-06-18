import { useState } from "react";

const feedbackTags = [
    "Effort",
    "Coachability",
    "Focus",
    "Confidence",
    "Footwork",
    "Blocking",
    "Tackling",
    "Catching",
    "Route Running",
    "Ball Security",
    "Conditioning",
    "Pad Level",
    "Hand Placement",
    "Stance",
    "Aggression",
    "Football IQ",
];

function FeedbackPanel({
    wentWell,
    setWentWell,
    needsWork,
    setNeedsWork,
    coachNote,
    setCoachNote,
}) {

    const toggleSelection = (tag, currentList, setList) => {
        if (currentList.includes(tag)) {
            setList(currentList.filter((item) => item !== tag));
        } else {
            setList([...currentList, tag]);
        }
    };

    const handleSaveFeedback = () => {
        setReviewedPlayers((prev) => [
            ...prev,
            selectedPlayer.id,
        ]);

        setSelectedPlayer(null);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <section className="feedback-panel">
            <h2>Coach Feedback</h2>

            <div className="feedback-section">
                <h3>Went Well</h3>
                <div className="tag-container">
                    {feedbackTags.map((tag) => (
                        <button
                            key={`went-${tag}`}
                            type="button"
                            className={wentWell.includes(tag) ? "tag active" : "tag"}
                            onClick={() => toggleSelection(tag, wentWell, setWentWell)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="feedback-section">
                <h3>Needs to Work On</h3>
                <div className="tag-container">
                    {feedbackTags.map((tag) => (
                        <button
                            key={`needs-${tag}`}
                            type="button"
                            className={needsWork.includes(tag) ? "tag active" : "tag"}
                            onClick={() => toggleSelection(tag, needsWork, setNeedsWork)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="feedback-section">
                <h3>Coach Note</h3>
                <textarea
                    className="coach-note"
                    placeholder="Optional note for the parent..."
                    value={coachNote}
                    onChange={(e) => setCoachNote(e.target.value)}
                />
            </div>

            <button type="button" className="save-feedback-btn" onClick={handleSaveFeedback}>
                Save Feedback
            </button>
        </section>
    );
}

export default FeedbackPanel;