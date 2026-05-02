import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state;

    if (!result) return <p>No data</p>;

    const getSeverityColor = (severity) => {
        if (severity > 10) return "#ff4d4f"; // red
        if (severity > 5) return "#faad14"; // yellow
        return "#52c41a"; // green
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                <h1 style={styles.title}>🧠 Diagnosis Result</h1>

                <div style={styles.section}>
                    <h3>Disease</h3>
                    <p style={styles.disease}>{result.disease}</p>
                </div>

                <div style={styles.section}>
                    <h3>Confidence</h3>
                    <p>{(result.confidence * 100).toFixed(2)}%</p>
                </div>

                <div style={styles.section}>
                    <h3>Description</h3>
                    <p>{result.description}</p>
                </div>

                <div style={styles.section}>
                    <h3>Precautions</h3>
                    <ul>
                        {result.precautions?.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </div>

                <div style={styles.section}>
                    <h3>Severity</h3>
                    <div style={{
                        ...styles.severity,
                        background: getSeverityColor(result.severity)
                    }}>
                        {result.severity}
                    </div>
                </div>

                {result.severity > 10 && (
                    <p style={styles.warning}>
                        ⚠️ Immediate medical attention recommended
                    </p>
                )}

                <button onClick={() => navigate("/symptoms")} style={styles.button}>
                    🔄 Check Again
                </button>

            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
    },
    card: {
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        width: "400px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
    },
    section: {
        marginBottom: "15px",
    },
    disease: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#1890ff",
    },
    severity: {
        color: "white",
        padding: "8px",
        borderRadius: "6px",
        textAlign: "center",
        fontWeight: "bold",
    },
    warning: {
        color: "red",
        marginTop: "10px",
        fontWeight: "bold",
    },
    button: {
        marginTop: "20px",
        width: "100%",
        padding: "10px",
        background: "#1890ff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};