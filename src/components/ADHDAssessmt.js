// FILE: src/components/ADHDAssessment.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  "Do you often have trouble wrapping up the final details of a project, once the challenging parts have been done?",
  "Do you often have difficulty getting things in order when you have to do a task that requires organization?",
  "Do you often have problems remembering appointments or obligations?",
  "When you have a task that requires a lot of thought, do you avoid or delay getting started?",
  "Do you often fidget or squirm with your hands or feet when you have to sit down for a long time?",
  "Do you feel overly active and compelled to do things, like you were driven by a motor?",
];

const ADHDAssessment = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/adhd-results", { state: { answers } });
  };

  return (
    
    <div className="ADHDAssmt">
      <h2>ADHD Assessment (Checklist)</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <label>{question}</label>
            <select
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            >
              <option value="">Select</option>
              <option value="Never">Never</option>
              <option value="Rarely">Rarely</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
              <option value="Very Often">Very Often</option>
            </select>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ADHDAssessment;
