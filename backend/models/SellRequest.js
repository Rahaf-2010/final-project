const mongoose = require ('mongoose');

const sellrequesteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        vehicleType: {
            type: String,
            required: true,
            trim: true,
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
        desiredPrice: {
            type: Number,
            required: true,
        },
        phone:{
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            trim: true,
        },          
        status: {
            type: String,
            enum: ['In Bearbeitung', 'Angenommen', 'Abgelehnt'],
            default: 'In Bearbeitung',
        },
        images: {
            type: [String],
            default: [],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('SellRequest', sellrequesteSchema);