/* This code is creating a router for handling different routes related to a game. */
const express = require('express')
const { getGames, addGame, updateGame, deleteGame, getGamebyPlayer } = require('../controllers/game')
const router = express.Router()

router.route('/game/:id').put(updateGame).delete(deleteGame)
router.route('/game').get(getGames).post(addGame)
router.route('/game/:name').post(getGamebyPlayer)
module.exports = router
