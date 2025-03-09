import Queue from '../models/patientModel.js'; // Assuming you have a Queue model defined
// import Patient from '../models/patientModel.js'; // Assuming you have a Patient model defined

export const getNextPatient = async (req, res) => {
    try {
        const nextPatient = await Queue.findOne().sort({ position: 1 });
        if (!nextPatient) {
            return res.status(404).json({ message: 'No patients in the queue' });
        }
        console.log(nextPatient)
        res.status(200).json(nextPatient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCurrentQueue = async (req, res) => {
    try {
        const currentQueue = await Queue.find().sort({ position: 1 });
        console.log(currentQueue)
        res.status(200).json(currentQueue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getQueueSize = async (req, res) => {
    try {
        const queueSize = await Queue.countDocuments();
        console.log(queueSize)
        res.status(200).json({ queueSize });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const estimateWaitTime = async (req, res) => {
    try {
        const patients = await Queue.find().sort({ position: 1 });
        const averageTimePerPatient = 10; // Assuming an average of 10 minutes per patient
        const waitTime = patients.length * averageTimePerPatient;
        console.log(waitTime)
        res.status(200).json({ waitTime });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};