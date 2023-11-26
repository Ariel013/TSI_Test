const Game = require('../models/game')
const Player = require('../models/player')

/* The `exports.addGame` function is a controller function that handles the logic for adding a new game
to the database. It is exported so that it can be used by other modules. */
exports.addGame = async (req, res) => {
  const game = {
    player_id: req.body.playerId,
    performance: {
      goals: req.body.goals,
      rebounds: req.body.rebounds,
      threePoints: req.body.threePoints,
      blocks: req.body.blocks,
      mistakes: req.body.mistakes
    }
  }

  if (!game.player_id) {
    return res.status(404).json({ message: 'Vous devez s\'il vous- plait renseigner le joueur' })
  } else {
    try {
      // Verifier si le joueur existe
      const playerId = game.player_id
      const existingPlayer = await Player.findOne({ _id: playerId })

      if (!existingPlayer) {
        return res.status(404).json({ message: 'Le joueur n\'a été trouvé' })
      }
      const gameAdded = await Game.create(game)
      return res.status(201).json({ message: 'Game created successfully', player_id: gameAdded._id })
    } catch (error) {
      console.error('Erreur lors de la création du match', error)
      res.status(500).json({
        message: 'Game not created successfully',
        error: error.message
      })
    }
  }
}

exports.updateGame = async (req, res) => {
  const game = req.body
  const gameId = req.params._id

  try {
    const gameToUpdate = await Game.findById(gameId)
    if (!gameToUpdate) {
      return res.status(404).json({ error: 'Game not found' })
    }

    if (game.goals) {
      gameToUpdate.goals = game.goals
    }
    if (game.goals) {
      gameToUpdate.rebounds = game.rebounds
    }
    if (game.threePoints) {
      gameToUpdate.threePoints = game.threePoints
    }
    if (game.blocks) {
      gameToUpdate.blocks = game.blocks
    }
    if (game.mistakes) {
      gameToUpdate.mistakes = game.mistakes
    }

    await gameToUpdate.save()
    return res.status(200).json({ message: 'Informations du game mis à jour avec succès' })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du game', error)
    // res.status(500).json({ error: 'Erreur lors de la mise à jour du game' })
  }
}
