import Patient from '../models/patientModel.js';

export const registerPatient = async (req, res) => {
    try {
        const { name, email, age, symptoms } = req.body;
        const newPatient = new Patient({ name, email, age, symptoms });
        await newPatient.save();
    console.log("Patient registered successfully");

        res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error registering patient', error: error.message });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedPatient = await Patient.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
};

export const removePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPatient = await Patient.findByIdAndDelete(id);
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing patient', error: error.message });
    }
};

export const getPatientByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ patient });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient', error: error.message });
    }
};