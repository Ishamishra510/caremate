import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SymptomChecker() {
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ➕ Add symptom
    const handleAddSymptom = () => {
        if (!input.trim()) return;

        const newSymptom = input.trim().toLowerCase();

        if (selected.includes(newSymptom)) {
            setInput("");
            return;
        }

        setSelected([...selected, newSymptom]);
        setInput("");
    };

    // ❌ Remove symptom
    const handleRemove = (symptom) => {
        setSelected(selected.filter(s => s !== symptom));
    };

    // 🚀 Predict
    const handlePredict = async () => {
        if (selected.length < 3) {
            alert("Please add at least 3 symptoms");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ symptoms: selected }),
            });

            const data = await res.json();

            navigate("/result", { state: data });

        } catch (err) {
            console.error(err);
            alert("Error connecting to backend");
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1>🩺 Symptom Checker</h1>

                {/* Input */}
                <div style={styles.inputRow}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter symptom (e.g. fever)"
                        style={styles.input}
                    />

                    <button onClick={handleAddSymptom} style={styles.addBtn}>
                        Add
                    </button>
                </div>

                {/* Selected Symptoms */}
                <h3>Selected Symptoms</h3>
                <div>
                    {selected.map((s, i) => (
                        <span key={i} style={styles.selected}>
                            {s}
                            <span
                                style={styles.remove}
                                onClick={() => handleRemove(s)}
                            >
                                ×
                            </span>
                        </span>
                    ))}
                </div>

                {/* Predict Button */}
                <button
                    onClick={handlePredict}
                    style={styles.predictBtn}
                >
                    {loading ? "Predicting..." : "🔍 Predict Disease"}
                </button>

                <p style={styles.note}>
                    * Add at least 3 symptoms for better prediction
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        marginTop: "60px",
    },
    card: {
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        width: "400px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    },
    inputRow: {
        display: "flex",
        gap: "10px",
        marginBottom: "15px",
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    addBtn: {
        padding: "10px",
        background: "#1890ff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    selected: {
        display: "inline-block",
        padding: "8px 12px",
        margin: "5px",
        background: "#52c41a",
        color: "white",
        borderRadius: "20px",
        fontSize: "14px",
    },
    remove: {
        marginLeft: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    predictBtn: {
        marginTop: "20px",
        width: "100%",
        padding: "12px",
        background: "#1890ff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
    },
    note: {
        marginTop: "10px",
        fontSize: "12px",
        color: "gray",
        textAlign: "center",
    },
};