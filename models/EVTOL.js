import mongoose from 'mongoose';
import Medication from './Medication.js';

const Schema = mongoose.Schema;

const EVTOLSchema = new Schema({
    serialNumber: {
      type: String,
      required: true,
      maxlength: 100
    },
    model: {
      type: String,
      required: true,
      enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight']
    },
    weightLimit: {
      type: Number,
      required: true,
      max: 500
    },
    batteryCapacity: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    state: {
      type: String,
      required: true,
      enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING']
    },
    medications: [Medication.schema]
});

const EVTOL = mongoose.model('EVTOL', EVTOLSchema);
export default EVTOL;