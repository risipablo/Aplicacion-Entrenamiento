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

    if (!day || !title || !routine || !piletas || !meters) {
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


exports.addRoutine = async (req, res) => {
    const { id } = req.params;
    const { newRoutine } = req.body;

    if (!newRoutine) {
        return res.status(400).json({ error: 'Completar los campos' });
    }

    try {
        const swin = await SwinModel.findById(id);

        if (!swin) {
            return res.status(404).json({ error: 'datos no encontrado' });
        }

        swin.routine.push(newRoutine);
        const updatedSwin = await swin.save();
        res.json(updatedSwin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


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