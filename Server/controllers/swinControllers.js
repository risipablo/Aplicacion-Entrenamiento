const SwinModel = require('../models/swinModels');

exports.getSwin = async (req, res) => {
    try {
        const swins = await SwinModel.find();
        res.json(swins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addSwin = async (req, res) => {
    const { day, title, routine, piletas, meters } = req.body;

    if (!day || !title || !routine || !piletas || !meters ) {
        return res.status(400).json({ error: 'Completar los campos' });
    }

    try {
        const newSwin = new SwinModel({
            day, title, routine, piletas, meters
        });

        const result = await newSwin.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Agregar una rutina interna
exports.addRoutine = async (req, res) => {
    const { id } = req.params;
    const { newPiletas, newMeters, newRoutine } = req.body;

    if (!newPiletas || !newMeters || !newRoutine) {
        return res.status(400).json({ error: 'Completar los campos' });
    }

    try {
        const swin = await SwinModel.findById(id);

        if (!swin) {
            return res.status(404).json({ error: 'datos no encontrado' });
        }

        swin.piletas.push(newPiletas)
        swin.meters.push(newMeters);
        swin.routine.push(newRoutine);
        const updatedSwin = await swin.save();
        res.json(updatedSwin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteRoutine = async (req,res) => {
    const {id, routineIndex} = req.params

    try{
        const deleteRoutine = await SwinModel.findById(id)

        if (!deleteRoutine) {
            return res.status(404).json({error: 'datos no encontrado'})
        }

        // Verificar si el index de la rutina es valido
        if(routineIndex < 0 || routineIndex >= deleteRoutine.routine.length){
            return res.status(404).json({error: 'index de la ruta no valido'})
        }

        // Eliminar el indice de cada uno
        deleteRoutine.routine.splice(routineIndex, 1)
        deleteRoutine.meters.splice(routineIndex, 1)
        deleteRoutine.piletas.splice(routineIndex, 1)

        
        const updatedSwin = await deleteRoutine.save();
        res.json(updatedSwin);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


exports.deleteSwin = async (req, res) => {
    const { id } = req.params;

    try {
        const swin = await SwinModel.findByIdAndDelete(id);

        if (!swin) {
            return res.status(404).json({ error: 'datos no encontrado' });
        }
        res.json(swin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.editSwin = async (req, res) => {
    const { id } = req.params;
    const { day, title, routine, piletas, meters } = req.body;

    try {
        const swin = await SwinModel.findByIdAndUpdate(
            id,
            { day, title, routine, piletas, meters },
            { new: true }
        );

        if (!swin) {
            return res.status(404).json({ error: 'Dato no encontrado' });
        }

        res.json(swin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


