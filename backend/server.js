/* This code is importing necessary modules and setting up the server for the application. */
const express = require('express')
const http = require('http')

const cors = require('cors')
const connectDB = require('./config/db')

const User = require('./models/user')
const bcrypt = require('bcrypt')

const authRoute = require('./routes/auth')
const crudUsers = require('./routes/user')

const app = express()

const server = http.createServer(app)

require('dotenv').config()

const corsOptions = {
  origin: `${process.env.FRONT_URL}`, // Autoriser uniquement ce domaine
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
}

// Création d'un admin au lancement de l'application
const createAdmin = async () => {
  try {
    // Vérifier si il existe déjà un administrateur
    const admin = await User.findOne({ role: 'admin' })

    if (!admin) {
      const mdp = 'Azerty1234'
      const saltRounds = parseInt(process.env.salt)
      const pass = await bcrypt.hash(mdp, saltRounds)

      const firstAdmin = new User({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: pass,
        phone: 22912345,
        role: 'admin',
        email_verified: true
      })
      await firstAdmin.save()
      console.log('Admin created succesfully')
    }
  } catch (error) {
    console.error('Erreur l\'ors de la création de l\'admin:', error)
  }
}

app.use(cors(corsOptions))
app.use(express.json())

const PORT = process.env.PORT

// Démarrage du serveur HTTP
server.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)
connectDB()

// Gestion des erreurs non gérées
process.on('unhandledRejection', (err) => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})

// Routes
app.use('/api/auth', authRoute)
app.use('/api/', crudUsers)

// Gestion des erreurs centralisée
app.use((err, req, res, next) => {
  console.error(`Une erreur est survenue : ${err.message}`)
  res.status(500).json({ error: 'Erreur interne du serveur' })
})

createAdmin()
module.exports = app
