const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const Record = require("./models/Record");
const connectDB = require("./config/db");
connectDB();

const { spawn } = require("child_process");

app.post("/predict", async (req, res) => {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
        return res.status(400).json({ error: "No symptoms provided" });
    }

    // ✅ Convert array → space-separated string (important for ML model)
    const symptomText = symptoms.join(" ");

    const python = spawn("py", [
        "../ai-model/predict.py",
        symptomText
    ]);

    let data = "";
    let errorData = "";

    python.stdout.on("data", (chunk) => {
        data += chunk.toString();
    });

    python.stderr.on("data", (chunk) => {
        errorData += chunk.toString();
    });

    python.on("close", async (code) => {
        if (code !== 0) {
            console.error("❌ Python error:", errorData);
            return res.status(500).json({ error: "Python execution failed" });
        }

        try {
            const response = JSON.parse(data);

            // ✅ Save to DB using parsed data
            const record = new Record({
                symptom: symptoms.join(" "),
                result: response.disease,
                advice: response.precautions.join(", "),
                severity: response.severity
            });

            await record.save();

            res.json(response);

        } catch (err) {
            console.error("❌ Parse error:", err);
            console.error("Raw output:", data);
            res.status(500).json({ error: "Invalid response from model" });
        }
    });
});

const dataset = require("../ai-model/dataset.json"); // or build manually

app.post("/suggest", (req, res) => {
    const { selectedSymptoms } = req.body;

    if (!selectedSymptoms || selectedSymptoms.length === 0) {
        return res.json([]);
    }

    const matches = dataset.filter(d =>
        selectedSymptoms.every(s => d.symptoms.includes(s))
    );

    const suggestionSet = new Set();

    matches.forEach(d => {
        d.symptoms.forEach(s => suggestionSet.add(s));
    });

    res.json(Array.from(suggestionSet));
});

// ✅ History API
app.get("/records", async (req, res) => {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});