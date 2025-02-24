const express = require('express');
const { getNotes, addNotes, deleteNotes, editNotes } = require('../controllers/notesController');
const router = express.Router()


router.get('/notes', getNotes)
router.post('/notes', addNotes)
router.delete('/notes/:id',deleteNotes)
router.patch('/notes/:id', editNotes)

module.exports = router;