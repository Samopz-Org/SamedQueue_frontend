import React from 'react';
import AssessmentForm from '../components/AssessmentForm';

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>ADHD Assessment Tool</h1>
            <AssessmentForm />
        </div>
    );
};

export default Home;