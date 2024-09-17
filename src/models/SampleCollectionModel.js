const { Schema, model } = require('mongoose');

const sampleCollectionSchema = new Schema({
    vendor: {
        type: [String], // Array to store selected vendors (e.g., ['Amar Lab', 'Arogga'])
        enum: ['Amar Lab', 'Arogga'],
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^\d{1,12}$/.test(v),
            message: "Please enter a valid phone number (up to 12 digits)"
        }
    },
    pickupTime: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: (v) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v),
            message: "Please enter a valid email"
        }
    }
}, { timestamps: true });

const SampleCollection = model('SampleCollection', sampleCollectionSchema);

module.exports = SampleCollection;