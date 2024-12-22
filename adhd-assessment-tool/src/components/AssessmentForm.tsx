import React, { useState } from 'react';

const AssessmentForm = () => {
    const [responses, setResponses] = useState({
        question1: '',
        question2: '',
        question3: '',
        // Add more questions as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponses({
            ...responses,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send responses to the server
        console.log('Submitted responses:', responses);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Question 1:
                    <input
                        type="text"
                        name="question1"
                        value={responses.question1}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Question 2:
                    <input
                        type="text"
                        name="question2"
                        value={responses.question2}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Question 3:
                    <input
                        type="text"
                        name="question3"
                        value={responses.question3}
                        onChange={handleChange}
                    />
                </label>
            </div>
            {/* Add more questions as needed */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default AssessmentForm;