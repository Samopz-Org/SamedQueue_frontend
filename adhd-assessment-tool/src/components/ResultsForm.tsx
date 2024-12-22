import React from 'react';

const ResultsForm: React.FC<{ results: any }> = ({ results }) => {
    return (
        <div className="results-form">
            <h2>Assessment Results</h2>
            <p>Your ADHD assessment results are as follows:</p>
            <ul>
                {Object.entries(results).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultsForm;