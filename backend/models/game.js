const Mongoose = require('mongoose')
const GameSchema = new Mongoose.Schema({
  player: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  goals: {
    type: Number
  },
  rebounds: {
    type: Number
  },
  threePoints: {
    type: Number
  },
  blocks: {
    type: Number
  },
  mistakes: {
    type: Number
  }

})
const Game = Mongoose.model('Game', GameSchema)
module.exports = Game
