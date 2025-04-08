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
};

// Function to process the user message
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
