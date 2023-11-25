const Player = require('../models/player')
const regex = /^[a-zA-Z]+(?: [a-zA-Z ]+){0,29}$/

/* The code block `exports.addPlayer` is defining an asynchronous function that handles the logic for
adding a player to a database. */
exports.addPlayer = async (req, res) => {
  const player = {
    playerName: req.body.playerName,
    jerseyNumber: req.body.jerseyNumber,
    position: req.body.position,
    playerImage: req.body.playerImage
  }

  // Validation de la requete
  if (!player.playerName || !player.jerseyNumber || !player.position || !player.playerImage) {
    return res.status(500).json({ message: 'All fields are required to add a package' })
  } else if (!regex.test(player.playerName)) {
    return res.status(400).json({ message: 'Invalid Name format' })
  } else {
    try {
      // Création du joueur
      await Player.create(player)
      return res.status(201).json({ message: 'Player created successfully' })
    } catch (error) {
      console.error('Erreur lors de la création du joueur', error)
      res.status(500).json({
        message: 'Player not created successfully',
        error: error.message
      })
    }
  }
}

/* The `exports.updatePlayer` function is an asynchronous function that handles the logic for updating
a player's information in the database. */
exports.updatePlayer = async (req, res) => {
  const playerUpdate = req.body
  const playerId = req.params.playerId
  try {
    const playerToUpdate = await Player.findById(playerId)

    if (!playerToUpdate) {
      return res.status(404).json({ error: 'Player not found' })
    }

    if (playerUpdate.playerName) {
      playerToUpdate.playerName = playerUpdate.playerName
    }
    if (playerUpdate.jerseyNumber) {
      playerToUpdate.jerseyNumber = playerUpdate.jerseyNumber
    }
    if (playerUpdate.position) {
      playerToUpdate.position = playerUpdate.position
    }
    if (playerUpdate.playerImage) {
      playerToUpdate.playerImage = playerUpdate.playerImage
    }

    await playerToUpdate.save()
    return res.status(200).json({ message: 'Informations du joueur mis à jour avec succès' })
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations du joueur', error)
    res.status(500).json({ error: 'Erreur lors de la mise à jour des informations du joueur' })
  }
}

/* The `exports.deletePlayer` function is an asynchronous function that handles the logic for deleting
a player from the database. */
exports.deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.id

    const player = await Player.findById(playerId)
    if (!player) {
      return res.status(404).json({ error: 'Joueur non trouvé' })
    }

    await Player.deleteOne({ _id: playerId })
    return res.status(200).json({ message: 'Joueur supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du package', error)
    res.status(500).json({ error: 'Erreur lors de la suppression du package' })
  }
}

/* The `exports.getOnePlayer` function is an asynchronous function that handles the logic for
retrieving a single player from the database. */
exports.getOnePlayer = async (req, res) => {
  try {
    const playerId = req.params.id

    const player = await Player.findById(playerId).populate('game')
    if (!player) {
      return res.status(404).json({ error: 'Joueur non trouvé' })
    }
    res.json(player)
  } catch (error) {
    console.error('Erreur lors de la récupération du joueur', error)
    res.status(500).json({ error: 'Erreur lors de la récupération du joueur' })
  }
}

/* The `exports.getPlayers` function is an asynchronous function that handles the logic for retrieving
all players from the database. */
exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find()
    return res.status(200).json(players)
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs', error)
    res.status(500).json({ error: 'Erreur lors de la récupération des joueurs' })
  }
}
