import pandas as pd
import json

df = pd.read_csv("dataset.csv")
df.fillna("None", inplace=True)

result = []

for _, row in df.iterrows():
    disease = row["Disease"]

    symptoms = []
    for col in df.columns[1:]:
        if row[col] != "None":
            symptoms.append(str(row[col]).strip().lower())

    result.append({
        "disease": disease,
        "symptoms": symptoms
    })

# Save JSON
with open("dataset.json", "w") as f:
    json.dump(result, f, indent=2)

print("dataset.json created!")
