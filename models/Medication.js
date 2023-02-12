import mongoose from "mongoose";
const Schema = mongoose.Schema;


const MedicationSchema = new Schema({
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9_-]+$/
    },
    weight: {
      type: Number,
      required: true
    },
    code: {
      type: String,
      required: true,
      match: /^[A-Z0-9_]+$/
    },
    image: {
      type: String
    }
});

const Medication = mongoose.model("Medication", MedicationSchema);
export default Medication;