import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/ADHDAssmt.css";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const handleChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);

    // Automatically move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 300); // Add a slight delay for better UX
    } else {
      // Navigate to results if it's the last question
      setTimeout(
        () => navigate("/adhd-results", { state: { answers: newAnswers } }),
        300
      );
    }
  };

  return (
    <div className="ADHDAssmt">
      <h2>ADHD Assessment (Checklist)</h2>
      <div className="question-container">
        <label>
          {`${currentQuestionIndex + 1}. ${questions[currentQuestionIndex]}`}
        </label>
        <select
          value={answers[currentQuestionIndex]}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Never">Never</option>
          <option value="Rarely">Rarely</option>
          <option value="Sometimes">Sometimes</option>
          <option value="Often">Often</option>
          <option value="Very Often">Very Often</option>
        </select>
      </div>
    </div>
  );
};

export default ADHDAssessment;
