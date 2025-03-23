// FILE: src/components/ADHDResults.js
import React from "react";
import { useLocation } from "react-router-dom";

const ADHDResults = () => {
  const location = useLocation();
  const { answers } = location.state;

  const calculateScore = () => {
    const scoreMap = {
      Never: 0,
      Rarely: 1,
      Sometimes: 2,
      Often: 3,
      "Very Often": 4,
    };
    return answers.reduce((total, answer) => total + scoreMap[answer], 0);
  };

  const score = calculateScore();
  const result =
    score >= 12 ? "'You have High likelihood of ADHD'" : "'You have Low likelihood of ADHD'";

  return (
    <div className="ADHDResults">
      <h2>ADHD Assessment Results:</h2>
      <p>Your score: {score}</p>
      <p>{result}</p>
      <div className="ADHDResults2">
        <p>Log in Back To Book An Appointment With Our Doctor</p>
        <p>For One-on-One Assessment and Diagnosis of other Conditions!</p>
      </div>
    </div>
  );
};

export default ADHDResults;
