import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={{ color: "#4CAF50" }}>CareMate 🩺</h1>
                <p style={{ color: "#666" }}>Smart Health Assistant</p>

                <input placeholder="Email" style={styles.input} />
                <input placeholder="Password" type="password" style={styles.input} />

                <button style={styles.button} onClick={() => navigate("/dashboard")}>
                    Login
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4CAF50, #81C784)",
    },
    card: {
        background: "white",
        padding: "35px",
        borderRadius: "12px",
        width: "320px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
    input: {
        width: "90%",
        padding: "12px",
        margin: "10px 0",
        borderRadius: "6px",
        border: "1px solid #ddd",
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontWeight: "bold",
    },
};