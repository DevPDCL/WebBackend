const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        maxlength: [30, "User name shouldn't be more than 30 character "],
        minlength: [3, "User name shouldn't be less than 3 character "]
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
            },
            message: "please enter a valid email"
        }
    },
    mobile: {
        type: String,
        required: [true, 'Mobile Number is required'],
        validate: {
            validator: (v) => {
                // Validate phone number with up to 12 digits
                return /^\d{1,16}$/.test(v);
            },
            message: "Please enter a valid phone number (up to 12 digits)"
        }
    },

    message: {
        type: String,
        maxlength: [255, "Message should be up to 255 character"]
    },
}, {timeseries:true})


const Message = model('Message', messageSchema)


module.exports = Message;