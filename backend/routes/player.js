/* This code is setting up a router for handling HTTP requests related to players in a web application. */
const express = require('express')
const { getPlayers, addPlayer, updatePlayer, getOnePlayer, deletePlayer } = require('../controllers/player')
const { verifyAdmin } = require('../middlewares/auth')
const router = express.Router()

router.route('/player').get(verifyAdmin, getPlayers).post(verifyAdmin, addPlayer)
router.route('/player/:id').put(verifyAdmin, updatePlayer).get(verifyAdmin, getOnePlayer).delete(verifyAdmin, deletePlayer)
module.exports = router
