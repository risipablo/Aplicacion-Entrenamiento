const mongoose = require('mongoose');

const swinSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    piletas: {
        type: [String],
        required: true
    },
    meters:{
        type:[String],
        required:true
    },

    routine: {
        type: [String], 
        required: true
    },
 
});

const SwinModel = mongoose.model('Swin', swinSchema);
module.exports = SwinModel;