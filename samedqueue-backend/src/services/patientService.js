import Patient from '../models/patientModel';

export const createPatient = async (patientData) => {
    const patient = new Patient(patientData);
    return await patient.save();
};

export const modifyPatient = async (patientId, updatedData) => {
    return await Patient.findByIdAndUpdate(patientId, updatedData, { new: true });
};

export const deletePatient = async (patientId) => {
    return await Patient.findByIdAndDelete(patientId);
};

export const getPatientByEmail = async (email) => {
    return await Patient.findOne({ email });
};