const Player = require('../models/player')
const regex = /^[a-zA-Z]+(?: [a-zA-Z ]+){0,29}$/

/* The code block `exports.addPlayer` is defining an asynchronous function that handles the logic for
adding a player to a database. */
exports.addPlayer = async (req, res) => {
  const player = {
    playerName: req.body.playerNameame,
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
