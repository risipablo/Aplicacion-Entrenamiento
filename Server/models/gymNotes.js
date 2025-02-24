const mongoose = require('mongoose')

const gymSchema = new mongoose.Schema({
    title:{type: String, required:true},
    muscle:{type: String, required:true},
    series:{type: String, required:true},
    reps:{type: String, required:true},
    // type:{type: String, required:true},
})

const gymModel = mongoose.model("Routine" ,gymSchema)
module.exports = gymModel

