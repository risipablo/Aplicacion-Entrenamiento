const express = require('express');
const router = express.Router();
const { getSwin, addSwin, deleteSwin, addRoutine, editSwin, deleteRoutine } = require('../controllers/swinControllers');

router.get('/swin', getSwin);
router.post('/add-swin', addSwin);
router.delete('/swin/:id', deleteSwin)
router.put('/swin/:id/add-routine', addRoutine);
router.delete('/swin/:id/delete-routine/:routineIndex', deleteRoutine)
router.patch('/swin/:id',editSwin)


module.exports = router;