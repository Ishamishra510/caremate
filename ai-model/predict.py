import os
import sys
import json
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# ==============================
# 📁 Base directory
# ==============================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ==============================
# 📊 Load expanded dataset
# ==============================

data = pd.read_csv(os.path.join(BASE_DIR, "expanded_dataset.csv"))

X = data["symptoms"]
y = data["disease"]

# ==============================
# 🔤 Vectorizer + Model
# ==============================

vectorizer = CountVectorizer(ngram_range=(1, 2))
X_vec = vectorizer.fit_transform(X)

model = MultinomialNB()
model.fit(X_vec, y)

# ==============================
# 📄 Load extra info
# ==============================

desc_df = pd.read_csv(os.path.join(BASE_DIR, "symptom_Description.csv"))
prec_df = pd.read_csv(os.path.join(BASE_DIR, "symptom_precaution.csv"))
severity_df = pd.read_csv(os.path.join(BASE_DIR, "Symptom-severity.csv"))

# ==============================
# 🔧 Utility
# ==============================


def normalize(symptom):
    return symptom.strip().lower()

# ==============================
# 📄 Get details
# ==============================


def get_details(disease):
    description = desc_df[desc_df['Disease'] == disease]['Description'].values
    precautions = prec_df[prec_df['Disease'] == disease].values

    return {
        "description": description[0] if len(description) > 0 else "Not available",
        "precautions": list(precautions[0][1:]) if len(precautions) > 0 else []
    }

# ==============================
# ⚠️ Severity Calculation
# ==============================


severity_map = dict(zip(severity_df["Symptom"], severity_df["weight"]))


def calculate_severity(symptoms):
    score = 0
    for s in symptoms:
        s = s.lower().replace(" ", "_")
        score += severity_map.get(s, 0)
    return score

# ==============================
# 🔮 Prediction function
# ==============================


def predict_top_diseases(symptoms):
    input_text = " ".join(symptoms)

    X_input = vectorizer.transform([input_text])
    probs = model.predict_proba(X_input)[0]

    top_indices = probs.argsort()[-3:][::-1]

    results = []
    for i in top_indices:
        disease = model.classes_[i]
        confidence = float(probs[i])
        results.append((disease, confidence))

    return results

# ==============================
# 🚀 MAIN EXECUTION
# ==============================


if __name__ == "__main__":

    input_data = sys.argv[1]

    try:
        symptoms = json.loads(input_data)
    except:
        symptoms = input_data.split(",")
        symptoms = [normalize(s) for s in symptoms if s.strip()]

    results = predict_top_diseases(symptoms)

    if not results:
        print(json.dumps({"error": "No prediction"}))
        sys.exit()

    best_disease = results[0][0]
    confidence = results[0][1]

    details = get_details(best_disease)
    severity = calculate_severity(symptoms)

    output = {
        "disease": best_disease,
        "confidence": confidence,
        "other_possible": [d for d, _ in results[1:]],
        "description": details["description"],
        "precautions": details["precautions"],
        "severity": severity
    }

    print(json.dumps(output))
