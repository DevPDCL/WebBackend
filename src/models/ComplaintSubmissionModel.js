const { Schema, model } = require('mongoose');

const complaintSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, "Name shouldn't be less than 3 characters"]
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: (v) => {
                // Validate phone number with up to 12 digits
                return /^\d{1,12}$/.test(v);
            },
            message: "Please enter a valid phone number (up to 12 digits)"
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String
    },
    branch: {
        type: String
    },
    complain: {
        type: String,
        required: [true, 'Complaint is required'],
        maxlength: [500, "Complaint should be up to 500 characters"]
    },
}, { timestamps: true });

const ComplaintSubmission = model('Complaint', complaintSchema);

module.exports = ComplaintSubmission;