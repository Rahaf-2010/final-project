const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
    {
        vehicleType: {
            type: String,
            required: true,
            trim: true,
        },
        offerNumber: {
            type: Number,
            unique: true,
        },
        brandModel: {
            type: String,
            required: true,
            trim: true,
        },
        year: {
            type: Number,
            required: true,
        },
        mileage: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        images: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        color: {
            type: String,
            trim: true,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Car', carSchema);