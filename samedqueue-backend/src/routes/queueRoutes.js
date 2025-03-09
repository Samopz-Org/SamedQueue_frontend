import express from 'express';
import {
  getNextPatient,
  getCurrentQueue,
  getQueueSize,
  estimateWaitTime
} from '../controllers/queueController.js';

const router = express.Router();

router.post('/next-patient', getNextPatient);
router.get('/current-queue', getCurrentQueue);
router.get('/queue-size', getQueueSize);
router.get('/estimate-wait-time', estimateWaitTime);

export default router;