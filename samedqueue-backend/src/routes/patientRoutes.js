import express from 'express';
import {
  registerPatient,
  updatePatient,
  removePatient,
  getPatientByEmail
} from '../controllers/patientController.js';

const router = express.Router();

router.post('/', registerPatient);
router.put('/:id', updatePatient);
router.delete('/:id', removePatient);
router.get('/:email', getPatientByEmail);

export default router;