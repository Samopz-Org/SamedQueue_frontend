import axios from 'axios';

const API_BASE_URL = 'https://api.example.com/adhd-assessment';

export const submitAssessmentResults = async (results) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/submit`, results);
        return response.data;
    } catch (error) {
        throw new Error('Error submitting assessment results: ' + error.message);
    }
};

export const getAssessmentData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/data`);
        return response.data;
    } catch (error) {
        throw new Error('Error retrieving assessment data: ' + error.message);
    }
};