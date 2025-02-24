const NoteModels = require("../models/notasModel")

exports.getNotes = async (req,res) => {
    try{
        const notes = await NoteModels.find();
        res.json(notes);
    } catch(error) {
        res.status(500).json({ error: err.message });
    }
};

exports.addNotes = async (req,res) => {
    const {title,description,date} = req.body;

    if (!title || !description || !date) {
        return res.status(400)
    }

    try{
        const newNote = new NoteModels({title,description,date})
        const result = newNote.save()
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteNotes = async (req,res) => {
    const {id} = req.params;

    try{
        const notes = await NoteModels.findByIdAndDelete(id)

        if (!notes){
            return res.status(404).json({ error: 'datos no encontrado' });
        }
        res.json(notes)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.editNotes = async (req,res) => {
    const {id} = req.params;
    const {title,description,date} = req.body;

    try{
        const notes = await NoteModels.findByIdAndUpdate(id,{title,description,date},{new:true})
        if (!notes) {
            return res.status(404).json({error: 'Datos no encontrados'})
        }
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

