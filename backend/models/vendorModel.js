const mongoose = require('mongoose');
const Company = require('./companyModel'); // Ensure the Company model is imported before use

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['ERP', 'AI', 'IOT'], required: true },
    requestedByCompanies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }] // Ensure 'Company' matches the model name
});

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;
