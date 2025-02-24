const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{ 
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

const NoteModel = mongoose.model('Note',notesSchema)
module.exports = NoteModel