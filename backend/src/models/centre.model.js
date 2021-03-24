const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CentreSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, index: { unique: true } },
    address: { type: String, required: true },
    nin: { type: String, required: true },
    phone: { type: String, index: { unique: true } },
    state: { type: String, required: true },
    lga: { type: String, required: true },
    longitude: { type: String, required: true },
    latitude: { type: String, required: true },
    status: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Centre', CentreSchema);