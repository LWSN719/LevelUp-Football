const drillMap = {
    Blocking: ["Hand Placement Drill", "Drive Block Drill", "Mirror Blocking Drill"],
    Footwork: ["Ladder Quick Feet", "Cone Shuffle Drill", "Mirror Footwork Drill"],
    Tackling: ["Form Tackle Breakdown", "Angle Tackle Drill", "Heads-Up Contact Progression"],
    Catching: ["Tennis Ball Reaction Drill", "High Point Catch Drill", "Sideline Toe Tap Drill"],
    "Route Running": ["Cone Break Drill", "Release Footwork Drill", "Stem & Break Drill"],
    "Ball Security": ["High and Tight Drill", "Gauntlet Drill", "Two-Hand Finish Drill"],
    Conditioning: ["Sprint Intervals", "Gasser Challenge", "Tempo Runs"],
    "Pad Level": ["Low Pad Stance Drill", "Leverage Walks", "Fit & Drive Drill"],
    "Hand Placement": ["Strike Timing Drill", "Inside Hands Drill", "Punch Reset Drill"],
    Stance: ["Stance Start Drill", "First Step Drill", "Balance Reset Drill"],
    Confidence: ["Controlled Contact Drill", "Win the Rep Challenge", "1v1 Success Reps"],
    Focus: ["Assignment Walkthrough", "Cadence Reaction Drill", "Reset Routine Drill"],
    Aggression: ["Finish Through Drill", "Drive Feet Drill", "Pursuit Angle Drill"],
    "Football IQ": ["Play Recognition Walkthrough", "Formation ID Drill", "Situation Quiz"],
    Coachability: ["Listen & Repeat Drill", "Correction Response Drill"],
    Effort: ["Pursuit Drill", "Whistle-to-Whistle Sprint"],
};

function DrillRecommendations({ needsWork = [] }) {
    const drills = [...new Set(needsWork.flatMap((area) => drillMap[area] || []))];

    return (
        <section className="feedback-panel">
            <h2>Recommended Drills</h2>

            {drills.length === 0 ? (
                <p className="muted">Select a “Needs to Work On” area to show drills.</p>
            ) : (
                <div className="drill-list">
                    {drills.map((drill) => (
                        <div key={drill} className="drill-item">
                            <strong>{drill}</strong>
                            <p>Recommended based on selected focus areas.</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default DrillRecommendations;