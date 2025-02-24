const gymModel = require('../models/gymNotes')

exports.getGym = async (req,res) => {
    try {
        const gym = await gymModel.find()
        res.json(gym)
    } catch (err){
        res.status(500).json({error:err.message})
    }
}

exports.addGym = async (req,res) => {
    const {title,muscle,series,reps,type} = req.body;

    if (!title || !muscle || !series || !reps || !type) {
        return res.status(400).json({ error: 'Completar los campos' });
    }

    try{
        const newGym = new gymModel({
            title,muscle,series,reps,type
        });

        const result = await newGym.save()
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addRoutine = async(req,res) => {
    const {id} = req.params;
    const {newRoutine} = req.body

    if (!newRoutine) {
        return res.status(400).json({ error: 'Completar los campos' });
    }

    try{
        const gym = await gymModel.findById(id)

        if (!gym) {
            return res.status(404).json({ error: 'datos no encontrado' });
        }

        gym.muscle.reps.serie.push(newRoutine)
        const updatedGym = await gym.save()
        res.json(updatedGym)
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}

exports.deleteGym = async (req,res) => {
    const {id} = req.params

    try{
        const gym = await gymModel.findByIdAndDelete(id)

        if (!gym){
            return res.status(404).json({error: 'datos no encontrado'})
        }
        res.json(swin);
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

exports.editGym = async (req,res) => {
    const {id} = req.params;
    const {title,muscle,series,reps,type} = req.body;

    try{
        const gym = await gymModel.findByIdAndUpdate(
            id,
            { title, muscle , series , reps , type},
            { new: true }
        )

        if (!gym) {
            return res.status(404).json({ error: 'Dato no encontrado' });
        }

        res.json(gym);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}