const Mongoose = require('mongoose')
const PlayerSchema = new Mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  jerseyNumber: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  playerImage: {
    type: String,
    default: 'lebron.jpeg'
  },
  game: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }

})
const Player = Mongoose.model('Player', PlayerSchema)
module.exports = Player
