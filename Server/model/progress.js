const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    category: String,
    subCate: String,
    url: String,
    records: [{type: Date, default: Date.now}]
});

module.exports = mongoose.model("progress", progressSchema);