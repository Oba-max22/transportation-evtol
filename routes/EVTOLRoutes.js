import express from 'express';
import { registerEVTOL, loadMedication, getLoadedMedications, getEVTOLsByState, getEVTOLBatteryCapacity } from '../controllers/EVTOLController';

const router = express.Router();

// register an EVTOL
router.post('/evtols', registerEVTOL);

// load medication
router.post('/evtols/:evtolId/medications', loadMedication);

// Get loaded medication items for a given eVTOL
router.get('/evtols/:evtolId/medications', getLoadedMedications);

// check available EVTOL for loading
router.get('/evtols', getEVTOLsByState);

// check  EVTOL battery level
router.get('/evtols/:evtolId/battery', getEVTOLBatteryCapacity);

export default router;