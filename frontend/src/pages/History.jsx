import { useEffect, useState } from "react";

export default function History() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/records")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRecords(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>History</h1>

            {records.length === 0 && <p>No records found</p>}

            {records.map((r, i) => (
                <div key={i} style={{
                    margin: "10px 0",
                    padding: "15px",
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                    <p><b>Symptoms:</b> {r.symptom}</p>
                    <p><b>Result:</b> {r.result}</p>
                    <p><b>Advice:</b> {r.advice}</p>
                </div>
            ))}
        </div>
    );
}