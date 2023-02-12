import Medication from '../models/Medication';
import EVTOL from '../models/EVTOL';

export const registerEVTOL = async (req, res) => {    
    const { serialNumber, model, weightLimit, batteryCapacity } = req.body;

    const evtol = new EVTOL({
        serialNumber,
        model,
        weightLimit,
        batteryCapacity,
        state: 'IDLE'
    });

    try {
        const savedEvtol = await evtol.save();
        res.status(201).send({
        message: 'EVTOL registered successfully',
        evtol: savedEvtol
        });
    } catch (error) {
        res.status(400).send({
        message: 'Failed to register EVTOL',
        error: error.message
        });
    }
};

export const loadMedication = async (req, res) => {
    const { name, weight, code, image } = req.body;
    const { evtolId } = req.params;

    const medication = new Medication({
        name,
        weight,
        code,
        image
    });

    try {
        const evtol = await EVTOL.findById(evtolId);
        if (!evtol) return res.status(404).send({ message: 'EVTOL not found' });

        if (evtol.weightLimit < medication.weight) {
            return res.status(400).send({
                message: 'Medication weight exceeds eVTOL weight limit'
            });
        }

        if (evtol.batteryCapacity < 25) {
            return res.status(400).send({
                message: 'Battery Capacity is below 25%'
            });
        }

        evtol.medications.push(medication);
        evtol.state = 'LOADING';
        const updatedEvtol = await evtol.save();

        res.send({
        message: 'Medication loaded successfully',
        evtol: updatedEvtol
        });
    } catch (error) {
        res.status(400).send({
        message: 'Failed to load medication',
        error: error.message
        });
    }
};

export const getLoadedMedications = async (req, res) => {
    const { evtolId } = req.params;
  
    try {
      const evtol = await EVTOL.findById(evtolId).populate('medications');
      if (!evtol) return res.status(404).send({ message: 'EVTOL not found' });
  
      res.send({
        message: 'Loaded medication items',
        medications: evtol.medications
      });
    } catch (error) {
      res.status(400).send({
        message: 'Failed to get loaded medication items',
        error: error.message
      });
    }
};

export const getEVTOLsByState = async (req, res) => {
    const { state } = req.params;
  
    try {
      const evtols = await EVTOL.find({ state });
      res.send({ evtols });
    } catch (error) {
      res.status(400).send({
        message: 'Failed to get EVTOLs by state',
        error: error.message
      });
    }
};

export const getEVTOLBatteryCapacity = async (req, res) => {
    const { evtolId } = req.params;

    try {
        const evtol = await EVTOL.findById(evtolId);
        if (!evtol) return res.status(404).send({ message: 'EVTOL not found' });

        res.send({
        message: 'EVTOL battery capacity',
        batteryCapacity: evtol.batteryCapacity
        });
    } catch (error) {
        res.status(400).send({
        message: 'Failed to get EVTOL battery capacity',
        error: error.message
        });
    }
};