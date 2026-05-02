import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1>Dashboard</h1>

            <div style={styles.card} onClick={() => navigate("/symptoms")}>
                <h3>🩺 Check Symptoms</h3>
                <p>Analyze your health instantly</p>
            </div>

            <div style={styles.card} onClick={() => navigate("/history")}>
                <h3>📜 View History</h3>
                <p>See your past health records</p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "30px",
    },
    card: {
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        background: "white",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        cursor: "pointer",
    },
};