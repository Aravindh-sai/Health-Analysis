const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
app.use(express.json()); // To handle JSON input

// Use cors middleware to allow cross-origin requests
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from the frontend
}));

// Define a small drug database
const drugDatabase = {
    "Ibuprofen": {
        effectiveness: "Good for headaches, fever, and inflammation.",
        risk: "Avoid if you have kidney disease or ulcers.",
        sideEffects: "Can cause stomach pain, nausea, dizziness.",
        alternative: "Acetaminophen (Tylenol), Naproxen."
    },
    "Paracetamol": {
        effectiveness: "Good for mild to moderate pain relief.",
        risk: "Avoid if you have liver disease.",
        sideEffects: "Can cause liver damage if overdosed.",
        alternative: "Ibuprofen, Aspirin."
    },
    "Aspirin": {
        effectiveness: "Good for pain relief and reducing inflammation.",
        risk: "Avoid if you have stomach ulcers or bleeding disorders.",
        sideEffects: "Can cause stomach irritation, bleeding.",
        alternative: "Ibuprofen, Paracetamol."
    },
    // Add more drugs as needed
    "Amoxicillin": {
    effectiveness: "An antibiotic used to treat bacterial infections.",
    risk: "Avoid if allergic to penicillin or cephalosporin antibiotics.",
    sideEffects: "Can cause diarrhea, nausea, and allergic reactions.",
    alternative: "Ciprofloxacin, Azithromycin."
  },
  "Ciprofloxacin": {
    effectiveness: "Used to treat a variety of bacterial infections.",
    risk: "Avoid if you have tendon disorders or a history of tendon rupture.",
    sideEffects: "Can cause nausea, dizziness, and tendon rupture.",
    alternative: "Amoxicillin, Levofloxacin."
  },
  "Prednisone": {
    effectiveness: "A corticosteroid used to treat inflammation, severe allergies, or autoimmune diseases.",
    risk: "Avoid if you have fungal infections or certain bacterial infections.",
    sideEffects: "Can cause weight gain, mood changes, and high blood sugar.",
    alternative: "Hydrocortisone, Dexamethasone."
  },
  "Lisinopril": {
    effectiveness: "Used to treat high blood pressure and heart failure.",
    risk: "Avoid if you have kidney disease or a history of angioedema.",
    sideEffects: "Can cause dizziness, high potassium levels, and fatigue.",
    alternative: "Enalapril, Ramipril."
  },
  "Simvastatin": {
    effectiveness: "Lowers cholesterol and reduces the risk of heart disease.",
    risk: "Avoid if you have liver disease or muscle pain.",
    sideEffects: "Can cause muscle pain, liver damage, or digestive issues.",
    alternative: "Atorvastatin, Pravastatin."
  },
  "Omeprazole": {
    effectiveness: "Reduces stomach acid and treats acid reflux and ulcers.",
    risk: "Avoid if you have liver disease or certain gastrointestinal conditions.",
    sideEffects: "Can cause headaches, nausea, and abdominal pain.",
    alternative: "Lansoprazole, Pantoprazole."
  },
  "Metformin": {
    effectiveness: "Helps control blood sugar levels in people with type 2 diabetes.",
    risk: "Avoid if you have kidney problems or severe liver disease.",
    sideEffects: "Can cause nausea, diarrhea, and abdominal discomfort.",
    alternative: "Glipizide, Glyburide."
  },
  "Albuterol": {
    effectiveness: "A bronchodilator used to treat asthma and COPD.",
    risk: "Avoid if you have heart disease or high blood pressure.",
    sideEffects: "Can cause nervousness, headache, and increased heart rate.",
    alternative: "Levalbuterol, Salmeterol."
  },
  "Hydrochlorothiazide": {
    effectiveness: "Used to treat high blood pressure and fluid retention.",
    risk: "Avoid if you have severe kidney or liver disease.",
    sideEffects: "Can cause dizziness, dehydration, and low potassium.",
    alternative: "Chlorthalidone, Furosemide."
  }
};

function findDrugInfo(userMessage) {
    // Convert to lowercase for case-insensitive matching
    const lowercasedMessage = userMessage.toLowerCase();

    // Check if any drug from the database is mentioned
    for (let drug in drugDatabase) {
        if (lowercasedMessage.includes(drug.toLowerCase())) {
            return drugDatabase[drug]; // Return the drug info
        }
    }

    return { error: "Sorry, I don't have information about this drug." }; // If no match
}

// Format the response to display the information nicely
// Format the response to display the information nicely (without `*` and `\n`)
function formatResponse(drugInfo) {
    if (drugInfo.error) {
        return drugInfo.error;
    }

    return `
      <strong>Effectiveness:</strong> ${drugInfo.effectiveness}<br />
    <strong>Risk:</strong> ${drugInfo.risk}<br />
    <strong>Side effects:</strong> ${drugInfo.sideEffects}<br />
    <strong>Alternative drugs:</strong> ${drugInfo.alternative}<br />
    `;
}


// New route to process user input and return drug info
app.post('/analyze', (req, res) => {
    const { userMessage } = req.body; // Get the user message

    // Get the drug info based on the message
    const drugInfo = findDrugInfo(userMessage);

    // Format and return the response
    res.json({ response: formatResponse(drugInfo) });
});

// Set up the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
