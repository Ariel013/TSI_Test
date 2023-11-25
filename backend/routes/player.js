const express = require('express')
const { getPlayers, addPlayer, updatePlayer, getOnePlayer, deletePlayer } = require('../controllers/player')
const router = express.Router()

router.route('/player').get(getPlayers).post(addPlayer)
router.route('/player/:id').put(updatePlayer).get(getOnePlayer).delete(deletePlayer)
module.exports = router
