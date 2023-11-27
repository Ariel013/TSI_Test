const Game = require('../models/game')
const Player = require('../models/player')

/* The `addGame` function is a controller function that handles the logic for adding a new game
to the database. It is exported so that it can be used by other modules. */
exports.addGame = async (req, res) => {
  const game = {
    player: req.body.playerId,
    goals: req.body.goals,
    rebounds: req.body.rebounds,
    threePoints: req.body.threePoints,
    blocks: req.body.blocks,
    mistakes: req.body.mistakes
  }

  if (!game.player) {
    return res.status(404).json({ message: 'Vous devez s\'il vous- plait renseigner le joueur' })
  } else {
    try {
      // Verifier si le joueur existe
      const playerId = game.player
      const existingPlayer = await Player.findOne({ _id: playerId })

      if (!existingPlayer) {
        return res.status(404).json({ message: 'Le joueur n\'a été trouvé' })
      }
      await Game.create(game)
      return res.status(201).json({ message: 'Game created successfully' })
    } catch (error) {
      console.error('Erreur lors de la création du match', error)
      res.status(500).json({
        message: 'Game not created successfully',
        error: error.message
      })
    }
  }
}

/* The `updateGame` function is a controller function that handles the logic for updating a
game in the database. It takes in the request (`req`) and response (`res`) objects as parameters. */
exports.updateGame = async (req, res) => {
  const game = req.body
  const gameId = req.params.id

  try {
    const gameToUpdate = await Game.findById(gameId)
    console.log(gameToUpdate)
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

/* The `exports.deleteGame` function is a controller function that handles the logic for deleting a
game from the database. It takes in the request (`req`) and response (`res`) objects as parameters. */
exports.deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id
    const game = await Game.findById(gameId)
    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }
    await Game.deleteOne({ _id: gameId })
    return res.status(200).json({ message: 'Game deleted successfully' })
  } catch (error) {
    console.error('Erreur lors de la suppression du Match', error)
    res.status(500).json({ error: 'Erreur lors de la suppression du Match' })
  }
}

/* The `exports.getGames` function is a controller function that handles the logic for retrieving all
games from the database. It is an asynchronous function that takes in the request (`req`) and
response (`res`) objects as parameters. */
exports.getGames = async (req, res) => {
  try {
    const games = await Game.find()
    return res.status(200).json(games)
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des matchs' })
  }
}

/* The `exports.getGamebyPlayer` function is a controller function that handles the logic for
retrieving all games associated with a specific player from the database. */
exports.getGamebyPlayer = async (req, res) => {
  try {
    const playerName = req.params.name

    const games = await Game.find({}).populate({
      path: 'player',
      match: { playerName: new RegExp(playerName, 'i') },
      select: ['playerName', 'position', 'playerImage', 'jerseyNumber']
    })

    if (!games) {
      return res.status.json(404).json({ message: 'PLayer not Found' })
    }

    const filteredGames = games.filter(game => game.player !== null)

    return res.status(200).json(filteredGames)
  } catch (error) {
    console.error('Erreur lors de la récupérattion des matchs', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des matchs' })
  }
}
