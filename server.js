import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import EVTOL from './models/EVTOL.js';

const evtols = [
    { serialNumber: 'A001', model: 'Lightweight', weightLimit: 200, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A002', model: 'Lightweight', weightLimit: 200, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A003', model: 'Lightweight', weightLimit: 200, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A004', model: 'Lightweight', weightLimit: 200, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A005', model: 'Lightweight', weightLimit: 200, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A006', model: 'Middleweight', weightLimit: 300, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A007', model: 'Middleweight', weightLimit: 300, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A008', model: 'Middleweight', weightLimit: 300, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A009', model: 'Middleweight', weightLimit: 300, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A010', model: 'Middleweight', weightLimit: 300, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A011', model: 'Cruiserweight', weightLimit: 400, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A012', model: 'Cruiserweight', weightLimit: 400, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A013', model: 'Cruiserweight', weightLimit: 400, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A014', model: 'Cruiserweight', weightLimit: 400, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A015', model: 'Cruiserweight', weightLimit: 400, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A016', model: 'Heavyweight', weightLimit: 500, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A017', model: 'Heavyweight', weightLimit: 500, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A018', model: 'Heavyweight', weightLimit: 500, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A019', model: 'Heavyweight', weightLimit: 500, batteryCapacity: 100, state: 'IDLE' },
    { serialNumber: 'A020', model: 'Heavyweight', weightLimit: 500, batteryCapacity: 100, state: 'IDLE' }
  ];

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
    }).catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
});

EVTOL.countDocuments({}).then((count) => {
    if (count === 0) {
        EVTOL.insertMany(evtols).then(() => {
            console.log("Inserted EVTOLs");
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    }
);