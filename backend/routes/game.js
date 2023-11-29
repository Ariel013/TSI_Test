/* This code is creating a router for handling different routes related to a game. */
const express = require('express')
const { getGames, addGame, updateGame, deleteGame, getGamebyPlayer } = require('../controllers/game')
const { verifyAdmin, auth } = require('../middlewares/auth')
const router = express.Router()

router.route('/game/:id').put(verifyAdmin, updateGame).delete(verifyAdmin, deleteGame)
router.route('/game').get(verifyAdmin, getGames).post(verifyAdmin, addGame)
router.route('/game/:name').post(auth, getGamebyPlayer)
module.exports = router
