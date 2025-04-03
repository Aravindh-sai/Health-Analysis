"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function HealthForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "None",
    height: "",
    weight: "",
    medications: [],
    smoking: "None",
    alcohol: "None",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || "None" });
  };

  const handleMedicationChange = (medication) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.includes(medication)
        ? prev.medications.filter((m) => m !== medication)
        : [...prev.medications, medication],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("User not authenticated!");
      return;
    }

    try {
      await setDoc(doc(db, "usersHealth", user.uid), {
        ...formData,
        age: formData.age || "None",
        height: formData.height || "None",
        weight: formData.weight || "None",
      });
      alert("Health data saved!");
      router.push("/home");
    } catch (error) {
      console.error("Error saving health data:", error);
      alert("Error saving data.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Health Intake Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} placeholder="Enter your name" />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" min="0" max="120" onChange={handleChange} placeholder="Age" />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" onChange={handleChange}>
              <option value="None">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Height (cm)</label>
            <input type="number" name="height" min="50" max="250" onChange={handleChange} placeholder="Height" />
          </div>

          <div className="form-group">
            <label>Weight (kg)</label>
            <input type="number" name="weight" min="10" max="300" onChange={handleChange} placeholder="Weight" />
          </div>

          <div className="form-group">
            <label>Medications</label>
            <div className="option-group">
              {["None", "Diabetes", "Hypertension", "Heart Disease"].map((med) => (
                <label key={med} className="option">
                  <input
                    type="checkbox"
                    value={med}
                    checked={formData.medications.includes(med)}
                    onChange={() => handleMedicationChange(med)}
                  />
                  {med}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Do you smoke?</label>
            <div className="option-group">
              <label className="option">
                <input type="radio" name="smoking" value="Yes" onChange={handleChange} /> Yes
              </label>
              <label className="option">
                <input type="radio" name="smoking" value="No" onChange={handleChange} /> No
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Do you consume alcohol?</label>
            <div className="option-group">
              <label className="option">
                <input type="radio" name="alcohol" value="Yes" onChange={handleChange} /> Yes
              </label>
              <label className="option">
                <input type="radio" name="alcohol" value="No" onChange={handleChange} /> No
              </label>
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
