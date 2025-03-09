import Patient from '../models/patientModel';

const queue = [];

// Function to fetch the next patient in the queue
export const fetchNextPatient = () => {
  if (queue.length > 0) {
    return queue.shift(); // Remove and return the first patient in the queue
  }
  return null; // Return null if the queue is empty
};

// Function to fetch the current queue
export const fetchCurrentQueue = () => {
  return queue; // Return the current queue
};

// Function to calculate the estimated wait time based on the number of patients in the queue
export const calculateWaitTime = () => {
  const averageServiceTime = 10; // Assume each patient takes 10 minutes on average
  return queue.length * averageServiceTime; // Return estimated wait time in minutes
};

// Function to add a patient to the queue
export const addPatientToQueue = (patient) => {
  queue.push(patient); // Add the patient to the end of the queue
};

// Function to get the size of the current queue
export const getQueueSize = () => {
  return queue.length; // Return the number of patients in the queue
};