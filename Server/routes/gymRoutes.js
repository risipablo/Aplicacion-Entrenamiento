const express = require('express');
const { getGym, deleteGym, addRoutine, addGym } = require('../controllers/gymControllers');

const router = express.Router();

router.get('/gym', getGym)
router.post('/gym', addGym)
router.delete('/gym', deleteGym)
router.put('/gym/:id/add-routine', addRoutine)


module.exports = router