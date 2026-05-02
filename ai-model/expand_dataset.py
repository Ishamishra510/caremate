import pandas as pd
from itertools import combinations


def normalize(symptom):
    return str(symptom).strip().lower().replace(" ", "_")


df = pd.read_csv("dataset.csv")
df.fillna("None", inplace=True)

new_rows = []

for _, row in df.iterrows():
    disease = row["Disease"]

    symptoms = [
        normalize(row[col])
        for col in df.columns[1:]
        if str(row[col]) != "None"
    ]

    for r in range(2, min(5, len(symptoms)) + 1):
        for combo in combinations(symptoms, r):
            new_rows.append({
                "symptoms": " ".join(combo),
                "disease": disease
            })

new_df = pd.DataFrame(new_rows)

new_df.to_csv("expanded_dataset.csv", index=False)

print("✅ Expanded dataset created!")
