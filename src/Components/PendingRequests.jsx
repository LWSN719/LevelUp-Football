import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function PendingRequests({ user, loadTeamAssignments }) {
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            const snapshot = await getDocs(collection(db, "teamRequests"));

            const requests = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            }));

            const pendingOnly = requests.filter(
                (request) => request.status === "pending"
            );

            setPendingRequests(pendingOnly);
        } catch (error) {
            console.error("Error loading requests:", error);
        }
    };

    const approveRequest = async (request) => {
        try {
            await addDoc(collection(db, "teamPlayers"), {
                teamId: request.teamId,
                teamName: request.teamName,
                playerId: request.playerId,
                playerName: request.playerName,
                parentId: request.parentId,
                parentEmail: request.parentEmail,

                coachId: user.uid,
                coachEmail: user.email,

                status: "active",
                createdAt: serverTimestamp(),
            });

            await updateDoc(doc(db, "teamRequests", request.id), {
                status: "approved",
                updatedAt: serverTimestamp(),
            });

            await loadRequests();
            if (loadTeamAssignments && user) {
                await loadTeamAssignments(user);
            }
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };

    const denyRequest = async (request) => {
        try {
            await updateDoc(doc(db, "teamRequests", request.id), {
                status: "denied",
                updatedAt: serverTimestamp(),
            });

            await loadRequests();
        } catch (error) {
            console.error("Error denying request:", error);
        }
    };

    return (
        <section className="feedback-panel">
            <h2>Pending Requests</h2>

            {pendingRequests.length === 0 ? (
                <p className="muted">No pending requests.</p>
            ) : (
                <div className="request-list">
                    {pendingRequests.map((request) => (
                        <div key={request.id} className="request-card">
                            <div>
                                <h3>{request.playerName}</h3>
                                <p>{request.teamName}</p>
                                <p className="muted">{request.parentEmail}</p>
                            </div>

                            <div className="request-actions">
                                <button
                                    className="approve-btn"
                                    onClick={() => approveRequest(request)}
                                >
                                    Approve
                                </button>

                                <button
                                    className="deny-btn"
                                    onClick={() => denyRequest(request)}
                                >
                                    Deny
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default PendingRequests;